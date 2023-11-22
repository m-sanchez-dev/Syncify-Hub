import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null;

class AppDelegate {
  // Add this method to address the warning
  applicationSupportsSecureRestorableState(): boolean {
    return true;
  }

  // ... Rest of your Electron app code ...

  // For example:
  createWindow() {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }
}

const myApp = new AppDelegate();

app.whenReady().then(myApp.createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    myApp.createWindow();
  }
});
