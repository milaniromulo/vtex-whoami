import * as vscode from "vscode";
import * as fs from "fs";
import DataVTEX, { hasVTEXToolbelt, hasVTEXSession } from "./data";

let myStatusBarItem: vscode.StatusBarItem;
let accountStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  if (hasVTEXToolbelt() && hasVTEXSession()) {
    const { login, account, currentWorkspace, WORKSPACE } = DataVTEX();

    myStatusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      1001
    );

    accountStatusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      1002
    );

    myStatusBarItem.text = `$(git-merge) ${currentWorkspace}`;
    accountStatusBarItem.text = `$(account) ${account}`;

    myStatusBarItem.tooltip = `Workspace`;
    accountStatusBarItem.tooltip = `${login}`;

    myStatusBarItem.show();
    accountStatusBarItem.show();

    fs.watchFile(WORKSPACE, () => {
      const { login, account, currentWorkspace } = DataVTEX();
      myStatusBarItem.text = `$(git-merge) ${currentWorkspace}`;
      myStatusBarItem.tooltip = `Workspace`;

      accountStatusBarItem.text = `$(account) ${account}`;
      accountStatusBarItem.tooltip = login;
    });

    const whoamiViewProvider = new WhoamiViewProvider(context.extensionUri);

    context.subscriptions.push(myStatusBarItem);
    context.subscriptions.push(accountStatusBarItem);
    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider(
        "vtexWhoamiView",
        whoamiViewProvider
      )
    );
  }
}

class WhoamiViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: false, // desabilitando scripts por enquanto
    };

    // Adicionando um try-catch para ver se há erros
    try {
      webviewView.webview.html = this.getWebviewContent();
      // console.log('WebView content set successfully');
    } catch (error) {
      // console.error('Error setting WebView content:', error);
    }
  }

  private getWebviewContent(): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <div>Teste Simples</div>
        </body>
      </html>
    `;
  }
}
