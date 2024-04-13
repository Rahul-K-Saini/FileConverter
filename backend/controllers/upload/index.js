import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url); // learn this in deep what is import.meta.url 
const __dirname = path.dirname(__filename);

export function upload(req, res) {
  const { format } = req.body;
  const uploadedFile = req.files.file;
  uploadedFile.name = `new.${format}`
  const uploadFolderPath = path.join(__dirname, '..', '..', 'uploads', uploadedFile.name);

  uploadedFile.mv(uploadFolderPath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    convertFile(uploadFolderPath, res, format)
      .catch((error) => {
        console.error(error);
        res.status(500).send(error);
      });
  });
}

async function convertFile(filePath, res, format) {
  const outputPath = path.join(__dirname, '..', '..', 'converted', `output-${Date.now()}.${format}`);
  const ffmpegCommand = `ffmpeg -i ${filePath} ${outputPath}`;
  console.log(ffmpegCommand);

  return new Promise((resolve, reject) => {
    exec(ffmpegCommand, async (error, stdout, stderr) => {
      if (error) {
        const errorMessage = `Error converting file: ${error.message}\n${stderr}`;
        console.error(errorMessage);
        reject(errorMessage);
        return;
      }

      try {
        const convertedFile = await fs.readFile(outputPath);
        const fileType = getFileType(format)
        res.setHeader('content-type',`${fileType}/${format}`);
  
       console.log(convertedFile);
        res.send(convertedFile);
        resolve();
      } catch (readError) {
        const errorMessage = `Error reading converted file: ${readError.message}`;
        console.error(errorMessage);
        reject(errorMessage);
      } finally {
        fs.unlink(filePath, (err) =>  console.log(`Error deleting uploaded file: ${err.message}`));
        fs.unlink(outputPath, (err) =>  console.log(`Error deleting converted file: ${err.message}`));
      }
    });
  });
}


function getFileType(format) {
    switch(format) {
        case "jpeg":
        case "jpg":
        case "jpe":
            return 'image';
            case "tiff":
            return 'image';
        case "gif":
            return 'image';
            case "raw":
              return 'image';
        case "svg":
            return 'image';
        case "bmp":
            return "image";
        case "png":
            return 'image';
        case "webp":
            return 'image';
        case "mp3":
            return 'audio';
        case "ogg":
            return 'audio';
        case "wav":
            return 'audio';
        case "aac":
            return 'audio';
        case "flac":
            return 'audio';
        case "mp4":
            return 'video';
        case "wmv":
            return 'video';
        case "webm":
            return 'video';
        case "m4v":
            return 'video';
        case "avi":
            return 'video';
        case "mov":
            return 'video';
        case "mpeg":
        case "mpg":
        case "mpe":
            return 'video';
        case "flv":
            return 'video';
        default:
            return 'unknown';
    }
}
