const fs   = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'log.txt');

function logMessage(message) {
  const timestamp = new Date().toISOString();
  const line      = `${timestamp} - ${message}\n`;
  fs.appendFile(logFile, line, (err) => {
    if (err) {
      console.error('Fehler beim Schreiben in die Log-Datei:', err);
    }
  });
}

module.exports = { logMessage };