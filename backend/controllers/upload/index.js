import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function upload(req, res) {
    const { format } = req.body;
    const uploadedFile = req.files.file;
    const uploadFolderPath = path.resolve(__dirname, '..', '..', 'uploads', uploadedFile.name);
    uploadedFile.mv(uploadFolderPath, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        convertFile(uploadFolderPath, res, format);
    });
}

function convertFile(filePath, res, format) {
    const outputPath = path.resolve(__dirname, '..', '..', 'converted', `output-${Date.now()}.${format}`);
    const ffmpegCommand = `ffmpeg -i ${filePath} ${outputPath}`;
    console.log(ffmpegCommand);
    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error converting file: ${error.message}`);
            return res.status(500).send('Error converting file.');
        }
        try {
            const convertedFile = fs.readFileSync(outputPath);
            res.setHeader('Content-Type', `video/${format}`);
            res.send(convertedFile);
        } catch (readError) {
            console.error(`Error reading converted file: ${readError.message}`);
            return res.status(500).send('Error reading converted file.');
        } finally {
            fs.unlinkSync(filePath);
            fs.unlinkSync(outputPath);
        }
    });
}


