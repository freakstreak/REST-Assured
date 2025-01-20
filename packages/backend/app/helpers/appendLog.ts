import fs from "fs";
import path from "path";

function appendLog(filePath, logMessage) {
  const fullPath = path.resolve(filePath);

  // Ensure the directory exists
  fs.mkdir(path.dirname(fullPath), { recursive: true }, (err) => {
    if (err) {
      console.error("Failed to create directory:", err);
      return;
    }

    // Append the log message to the file
    const logEntry = `[${new Date().toISOString()}] ${logMessage}\n`;
    fs.appendFile(fullPath, logEntry, (err) => {
      if (err) {
        console.error("Failed to write to log file:", err);
      } else {
        console.log("Log successfully written to:", fullPath);
      }
    });
  });
}

// Usage example
export default appendLog;
