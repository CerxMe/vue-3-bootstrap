# Vue 3 Template

This repository provides a template for a Vue 3 application including the following components and configurations:

- Vue 3
- Vue CLI 4
- Vue Router
- CSS Pre-processors
- Linter and formatter

## Before You Begin

Note that some installers may modify your `PATH` environment variable, so be sure to close and reopen any terminal windows or apps that use `PATH` after installing something.

## 1. Install Node

Installing Node is required in order to use Node Package Manager (NPM).

1. Visit https://nodejs.org.
2. Download the installer for either the LTS version or the current version.
3. Install Node. Be sure to add Node to your `PATH` (this is selected by default in the installer).
4. Open a terminal window.
5. Execute the following command: `npm --version`. The NPM version should be reported.

## 2. Install the Yarn Bootstrapper

Yarn provides an improved experience over NPM. Yarn is optional but recommended. The `yarn` package is actually a bootstrapper used to bootstrap Yarn per repository.

1. Open a terminal window.
2. Execute the following command: `npm install --global yarn@latest`.
3. Execute the following command: `yarn --version`. The Yarn version should be reported.

## 3. Install Vue CLI

1. Execute the following command: `npm install --global @vue/cli@latest`.
2. Execute the following command: `vue --version`. The Vue CLI version should be reported.

## 4. Install Prettier

1. Execute the following command: `npm install --global prettier@latest`.

## 5. Install Visual Studio Code

1. Visit https://code.visualstudio.com.
2. Download the Visual Studio code installer.
3. Install Visual Studio Code.

## 6. Create and Clone an Empty GitHub Repository

These steps may be skipped if you do not want to create a Git repository for your project.

1. Create and clone an empty GitHub repository.
2. Open a terminal window.
3. Navigate to the local project directory.
4. If you do not have a global Git name configured, execute the following command: `git config user.name "Your Name"`.
5. If you do not have a global Git email address configured, execute the following command: `git config user.email 12345+obfuscated@users.noreply.github.com`. Using your obfuscated GitHub email address is recommended.

## 7. Open the Local Project Directory in Visual Studio Code

1. Open the local project directory in Visual Studio Code.
2. Visual Studio Code may prompt you to install recommended extensions. Install them if you wish.
3. Open a terminal window within Visual Studio Code.

All subsequent steps will assume you have opened the local project folder in Visual Studio Code and have opened a terminal window within Visual Studio Code.

## 8. Create the Vue Scaffolding

1. Execute the following command: `vue create .`.
2. Select whatever options you want.

## 9. Install Yarn

1. Execute the following command: `yarn set version berry`.

## 10. Add .gitignore

1. Add a `.gitignore` file with the following contents:

```text
.DS_Store
node_modules
/dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Yarn
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# Visual Studio Code
.vscode/*
!.vscode/extensions.json
```
