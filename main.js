console.log("Hello  World!");

const { PDFDocument} = require("pdf-lib");
const { readFileSync } = require("fs");

async function getNumPages() {
  const pdfPath = "D:\\Semesters\\Semester_VIII\\MIDSEM_Exam_Prog.pdf";
  const document = await PDFDocument.load(readFileSync(pdfPath));
  const totalPages = document.getPageCount();
  console.log(totalPages);
}

getNumPages();





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