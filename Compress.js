const fs = require('fs');
const archiver = require('archiver');

const inputFileName = 'input.txt';
const outputFileName = 'compressed.zip';

const output = fs.createWriteStream(outputFileName);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(archive.pointer() + ' total bytes');
  console.log(`Compressed file saved to: ${outputFileName}`);
});

archive.pipe(output);

archive.file(inputFileName, { name: 'compressed.txt' });
archive.finalize();
