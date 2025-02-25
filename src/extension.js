const vscode = require('vscode');
const axios = require('axios');

const GEMINI_API_KEY = 'AIzaSyD5qXV91gy6qnARhKOh-7Lg0TX3N-kGp5E'; // Replace with key from ai.google.dev

function activate(context) {
  let disposable = vscode.commands.registerCommand('codezap.generate', async () => {
    const prompt = await vscode.window.showInputBox({ prompt: 'Enter prompt (e.g., "write Python sum function")' });
    if (prompt) {
      try {
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
          {
            contents: [{
              parts: [{
                text: `Generate Python code, a test case, a debug hint, and a GitHub Actions CI step for: "${prompt}"`
              }]
            }]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${GEMINI_API_KEY}`
            }
          }
        );
        const result = response.data.candidates[0].content.parts[0].text;
        const [code, test, debug, ci] = parseGeminiResponse(result);

        const editor = vscode.window.activeTextEditor;
        if (editor) {
          editor.edit(editBuilder => {
            // Place it here!
            editBuilder.insert(editor.selection.active, `${code}\n\n${test}\n\n# Debug: ${debug}\n\n# CI Suggestion: ${ci}`);
          });
          vscode.window.showInformationMessage('CodeZap: Generated code, test, debug hint, and CI suggestion!');
        }
      } catch (error) {
        vscode.window.showErrorMessage('CodeZap Error: ' + error.message);
      }
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

function parseGeminiResponse(text) {
  const lines = text.split('\n');
  let code = '', test = '', debug = '', ci = '';
  let section = '';
  lines.forEach(line => {
    if (line.startsWith('Code:')) section = 'code';
    else if (line.startsWith('Test:')) section = 'test';
    else if (line.startsWith('Debug:')) section = 'debug';
    else if (line.startsWith('CI:')) section = 'ci';
    else if (section === 'code') code += line + '\n';
    else if (section === 'test') test += line + '\n';
    else if (section === 'debug') debug += line + '\n';
    else if (section === 'ci') ci += line + '\n';
  });
  return [code.trim(), test.trim(), debug.trim(), ci.trim()];
}

module.exports = { activate, deactivate };