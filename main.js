// const { PDFDocument} = require("pdf-lib");
// const { readFileSync } = require("fs");

// async function getNumPages() {
//   const pdfPath = "D:\\Semesters\\Semester_VIII\\MIDSEM_Exam_Prog.pdf";
//   const document = await PDFDocument.load(readFileSync(pdfPath));
//   const totalPages = document.getPageCount();
//   console.log(totalPages);
// }

// getNumPages();



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


const path = require('path');

const {app, BrowserWindow, Menu, ipcMain, shell} = require('electron');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;

// Create Main Window
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Image Resizer',
        width: isDev ? 1200 : 700,
        // width: 500,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Open devtools if in dev env
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

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

// App closed
app.on('window-all-closed', () => {
  if (!isMac) {
      app.quit();
  }
});