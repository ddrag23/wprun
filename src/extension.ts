// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { ProjectTreeDataProvider } from "./project-tree-provider";
import os from "os";
import { createJsonFile, loadProjectJson, runProject } from "./util";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const projectTreeProvider = new ProjectTreeDataProvider();
  vscode.window.registerTreeDataProvider(
    "project-workspace-view",
    projectTreeProvider
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("wprun.all", () => {
      const projects = loadProjectJson();
      if (!projects) {
        vscode.window.showErrorMessage("project.json doesnt exist");
      } else {
        projects.forEach((project) => runProject(project));
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "wprun.single-project",
      (project: { name: string; path: string; command: string }) =>
        runProject(project)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("wprun.refresh", () => {
      projectTreeProvider.refresh();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("wprun.create-json", () => {
      createJsonFile();
      vscode.commands.executeCommand("wprun.refresh");
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
