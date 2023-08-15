import * as fs from "fs";
import { join } from "path";
import { homedir } from "os";

const VTEX_FOLDER = join(homedir(), ".vtex");
const SESSION_FOLDER = join(VTEX_FOLDER, "session");
const SESSION = join(SESSION_FOLDER, "session.json");
const WORKSPACE = join(SESSION_FOLDER, "workspace.json");

export default function DataVTEX() {
  const { account, login } = JSON.parse(fs.readFileSync(SESSION, "utf8"));
  const { currentWorkspace } = JSON.parse(fs.readFileSync(WORKSPACE, "utf8"));

  return {
    login: account ? login : "Account",
    account: account ? account : "Disconnected",
    currentWorkspace: currentWorkspace ? currentWorkspace : "Disconnected",
    WORKSPACE,
  };
}

export function hasVTEXToolbelt() {
  return fs.existsSync(VTEX_FOLDER);
}

export function hasVTEXSession() {
  return fs.existsSync(SESSION_FOLDER);
}
