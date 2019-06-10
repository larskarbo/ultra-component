// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs-extra');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ultra-component" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', async function () {
		// The code you place here will be executed every time your command is executed
		const name = await vscode.window.showInputBox()
		if (typeof name == "undefined" || name.length == 0) {
			return
		}
		const dir = path.dirname(vscode.window.activeTextEditor.document.fileName)
		// Display a message box to the user
		const pathComp = path.join(dir ,name+".js")
		console.log('pathComp: ', pathComp);
		if (await fs.pathExists(pathComp)) {
			vscode.window.showInformationMessage("path already existed");
			return
		}
		var component = await fs.readFile(path.join(__dirname, "Component.js"), "utf8")
		const componentString = component.replace(/CrazyComp/g, name)
		await fs.outputFile(pathComp, componentString)

		var hey = await fs.readFile(vscode.window.activeTextEditor.document.fileName, "utf8")
		console.log('hey: ', hey);
		const str = `import ${name} from './${name}'\n`
		await fs.outputFile(vscode.window.activeTextEditor.document.fileName, str + hey)


		vscode.window.showInformationMessage(__dirname);
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
