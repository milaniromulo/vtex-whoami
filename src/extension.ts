import * as vscode from 'vscode';
import * as fs from 'fs';
import VTEXData from './data';

let myStatusBarItem: vscode.StatusBarItem;
let accountStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	const { login, account, currentWorkspace, WORKSPACE } = VTEXData();

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
	accountStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1001);

	myStatusBarItem.text = `$(git-merge) ${currentWorkspace}`;
	accountStatusBarItem.text = `$(account) ${account}`;

	myStatusBarItem.tooltip = `Workspace`;
	accountStatusBarItem.tooltip = `${login}`;

	myStatusBarItem.show();
	accountStatusBarItem.show();

	fs.watchFile(WORKSPACE, () => {
		const { login, account, currentWorkspace } = VTEXData();
		myStatusBarItem.text = `$(git-merge) ${currentWorkspace}`;
		myStatusBarItem.tooltip = `Workspace`;

		accountStatusBarItem.text = `$(account) ${account}`;
		accountStatusBarItem.tooltip = `${login}`;
	});

	context.subscriptions.push(myStatusBarItem);
	context.subscriptions.push(accountStatusBarItem);
}