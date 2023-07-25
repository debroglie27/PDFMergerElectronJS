const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const os = require('os');
const path = require('path');
const { readFileSync, writeFileSync } = require("fs");
const { PDFDocument } = require("pdf-lib");
const PDFMerger = require('pdf-merger-js');

const isMac = process.platform === 'darwin';

let mainWindow;

// Create Main Window
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Image Resizer',
        width: 1200,
        // width: 700,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

// App is ready
app.whenReady().then(() => {
  createMainWindow();

  // // Implement Menu
  // const mainMenu = Menu.buildFromTemplate(menu);
  // Menu.setApplicationMenu(mainMenu);

  // Remove mainWindow from memory on close
  mainWindow.on('closed', () => (mainWindow = null));

  app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow();
      }
  });
});


// respond to ipcRenderer filepaths
ipcMain.on('pdf:filepaths', (event, filePaths) => {
    generatePageObject(filePaths);
});

// respond to ipcRenderer merge
ipcMain.on('pdf:merge', (event, fileObjects) => {
    mergeFileObjects(fileObjects);
});


async function generatePageObject(filePaths) {
    let pdfPageObject = []

    for (let i=0; i<filePaths.length; i++) {
        const pdfDocument =  await PDFDocument.load(readFileSync(filePaths[i]));
        pdfPageObject.push({firstPage: 1, lastPage: pdfDocument.getPageCount()});
    }
    
    // Send pageObject to renderer
    mainWindow.webContents.send("pdf:pageobject", pdfPageObject);
}


async function mergeFileObjects(fileObjects) {
    let merger = new PDFMerger();

    for (let i = 0; i < fileObjects.length; i++) {
        await merger.add(fileObjects[i].filePath);
    }
    
    // Export the merged PDF as a nodejs Buffer
    const mergedPdfBuffer = await merger.saveAsBuffer();

    // Save Options for save dialog box
    let saveOptions = {
        title: 'Save Merged File - PDF Merger',
        defaultPath: path.join(os.homedir(), 'Merged-File.pdf'),
        filters : [
            {name: 'PDF File', extensions: ['*.pdf']}
        ],
    };

    // Collecting Save Information
    saveInfo = await dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), saveOptions);

    if (!saveInfo.canceled) {
        writeFileSync(saveInfo.filePath, mergedPdfBuffer);

        // Send success to renderer
        mainWindow.webContents.send("pdf:mergesuccess");
    }
}


// App closed
app.on('window-all-closed', () => {
  if (!isMac) {
      app.quit();
  }
});
