import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { loadProjectJson } from "./util";

export interface ProjectConfig {
  name: string;
  path: string;
  command: string;
}

class ProjectTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly project: ProjectConfig
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.iconPath = new vscode.ThemeIcon("play");
    this.command = {
      command: "wprun.single-project",
      title: "Run Project",
      arguments: [project],
    };
  }
}

export class ProjectTreeDataProvider
  implements vscode.TreeDataProvider<ProjectTreeItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    ProjectTreeItem | undefined
  > = new vscode.EventEmitter<ProjectTreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<ProjectTreeItem | undefined> =
    this._onDidChangeTreeData.event;

  private projects: ProjectConfig[] = [];

  constructor() {
    this.loadProjects();
  }

  private loadProjects() {
    const jsonFile = loadProjectJson();
    if (jsonFile) {
      this.projects = jsonFile;
    }
  }

  getTreeItem(element: ProjectTreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(): ProjectTreeItem[] {
    return this.projects.map(
      (project) => new ProjectTreeItem(project.name, project)
    );
  }

  refresh() {
    this.loadProjects();
    this._onDidChangeTreeData.fire(undefined);
  }
}
