# WPRUN - Workspace Project Runner

WPRUN is a Visual Studio Code extension designed to run multiple projects within the same workspace or folder efficiently. It provides a sidebar view where you can see all registered projects and execute them with a single click.

## Features

- **Project Auto-Detection**: Reads a `projects.json` file to list available projects automatically.
- **Run Projects Easily**: Provides a sidebar with a "Run" button for each project.
- **Custom Commands**: Supports running custom commands per project.
- **Add New Projects**: If `projects.json` is missing, an option to create it is available.
- **Remove Configuration**: Easily delete `projects.json` from the sidebar.

### Screenshot

![WPRUN Sidebar](resources/main-icon.svg)

## Requirements

- **Node.js** installed on your system (for running npm/yarn-based projects).
- Your project should have a valid `projects.json` file in the root workspace.

## Configuration

WPRUN reads a `projects.json` file in the root of your workspace. The format is as follows:

```json
[
  {
    "name": "Backend",
    "path": "./backend",
    "command": "npm run dev"
  },
  {
    "name": "Frontend",
    "path": "./frontend",
    "command": "npm start"
  }
]
```

- **`name`**: The name of the project.
- **`path`**: Relative path to the project folder.
- **`command`**: The command to run the project.

## Usage

1. Open your workspace in VS Code.
2. If `projects.json` does not exist, click the **"Create projects.json"** button in the sidebar.
3. Once the projects are loaded, click **"Run"** next to any project to start it.

## Extension Commands

This extension provides the following commands:

- `wprun.create-json` → Creates a default `projects.json` file.
- `wprun.single-project` → Runs a selected project.
- `wprun.all` → Runs all project.

## Known Issues

- If a project does not start, ensure that the specified `command` is correct.
- The extension currently does not support debugging.

## Release Notes

### 1.0.0

- Initial release of WPRUN.
- Sidebar with project list and run buttons.
- Support for `projects.json` configuration.

### 1.1.0

- Added feature to create `projects.json` automatically.
- Added support for removing `projects.json`.

## Extension Guidelines

Ensure that you've read through the extension guidelines and follow the best practices for creating your extension:

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Additional Resources

- [VS Code API Reference](https://code.visualstudio.com/api)
- [Markdown Syntax Guide](https://help.github.com/articles/markdown-basics/)

**Enjoy using WPRUN!** 🚀

