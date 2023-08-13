import * as fs from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export default function DataVTEX() {
    const VTEX_FOLDER = join(homedir(), '.vtex');
    const SESSION_FOLDER = join(VTEX_FOLDER, 'session');
    const SESSION = join(SESSION_FOLDER, 'session.json');
    const WORKSPACE = join(SESSION_FOLDER, 'workspace.json');

    console.log(fs.existsSync(VTEX_FOLDER))
    console.log(fs.existsSync(SESSION))

    const { account, login } = JSON.parse(fs.readFileSync(SESSION, 'utf8'));
    const { currentWorkspace } = JSON.parse(fs.readFileSync(WORKSPACE, 'utf8'));

    return {
        login,
        account,
        currentWorkspace,
        WORKSPACE
    };
}

export function hasVTEXToolbelt() {
    const VTEX_FOLDER = join(homedir(), '.vtex');
    return fs.existsSync(VTEX_FOLDER)
}