const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { readFileSync } = require("fs");
const { PDFDocument } = require("pdf-lib");

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


async function generatePageObject(filePaths) {
    let pdfPageObject = []

    for (let i=0; i<filePaths.length; i++) {
        const pdfDocument =  await PDFDocument.load(readFileSync(filePaths[i]));
        pdfPageObject.push({firstPage: 1, lastPage: pdfDocument.getPageCount()});
    }
    
    // Send pageObject to renderer
    mainWindow.webContents.send("pdf:pageobject", pdfPageObject);
}


// App closed
app.on('window-all-closed', () => {
  if (!isMac) {
      app.quit();
  }
});


// const PDFMerger = require('pdf-merger-js');

// var merger = new PDFMerger();

// (async () => {
//   await merger.add('D:\\Semesters\\Semester_VIII\\MIDSEM_Exam_Prog.pdf');  //merge all pages. parameter is the path to file and filename.
//   await merger.add('D:\\Semesters\\Semester_VIII\\MIDSEM_Exam_Prog.pdf'); // merge only page 2
//   await merger.save('merged.pdf'); //save under given name and reset the internal document
  
//   // Export the merged PDF as a nodejs Buffer
//   // const mergedPdfBuffer = await merger.saveAsBuffer();
//   // fs.writeSync('merged.pdf', mergedPdfBuffer);
// })();