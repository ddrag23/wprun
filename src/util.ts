import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import os from "os";
import { ProjectConfig } from "./project-tree-provider";
export function loadProjectJson(): ProjectConfig[] | undefined {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) return;

  // Ambil folder utama dari workspace
  const workspaceRoot = workspaceFolders[0].uri.fsPath;
  const configPath = path.join(workspaceRoot, "projects.json");
  if (fs.existsSync(configPath)) {
    const content = fs.readFileSync(configPath, "utf-8");
    const mappingContent = (JSON.parse(content) as ProjectConfig[]).map(
      (item) => ({ ...item, path: workspaceRoot + item.path })
    );
    return mappingContent;
  }
}

export function runProject(project: ProjectConfig) {
  vscode.window.showInformationMessage(`Running ${project.name}...`);
  const terminal = vscode.window.createTerminal(project.name);
  let command = `cd ${project.path} && ${project.command}`;
  if (os.platform() == "win32") {
    command = `cd ${project.path}; ${project.command}`;
  }
  terminal.sendText(command);
  terminal.show();
}

export function createJsonFile() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) return;

  // Ambil folder utama dari workspace
  const workspaceRoot = workspaceFolders[0].uri.fsPath;
  const filePath = path.join(workspaceRoot, "projects.json");

  // Data awal untuk projects.json
  const defaultProjects = [
    {
      name: "Backend",
      path: "/path/to/backend",
      command: "npm run dev",
    },
  ];
  // Cek apakah file sudah ada
  if (!fs.existsSync(filePath)) {
    // Simpan file JSON
    fs.writeFileSync(
      filePath,
      JSON.stringify(defaultProjects, null, 2),
      "utf-8"
    );
    console.log("✅ projects.json has been created!");
  } else {
    console.log("⚠️ projects.json already exists!");
  }
}
