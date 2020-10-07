"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// 1. レンダープロセスとなる、ウィンドウを作成する関数を定義
const createWindow = () => {
    // ウィンドウオブジェクトを作成する
    const win = new electron_1.BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            contextIsolation: true,
        },
    });
    // 読み込む index.htmlを指定する
    // tsc でコンパイルするので、出力先の dist の相対パスで指定する
    win.loadFile('./index.html');
    // 開発者ツールを起動する
    win.webContents.openDevTools();
};
// 2. Electronの起動準備が終わったら、ウィンドウを作成する
electron_1.app.whenReady().then(createWindow);
// 3. すべての ウィンドウ が閉じたときの処理を設定
electron_1.app.on('window-all-closed', () => {
    // macOS 以外では、メインプロセスを停止する
    // macOS では、ウインドウが閉じてもメインプロセスは停止せず
    // ドックから再度ウインドウが表示されるようにする
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// 4. ウィンドウが再度アクティブなったときに画面が無かった場合の処理を設定
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map