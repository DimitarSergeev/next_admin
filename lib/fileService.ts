import fs from "fs";
import path from "path";
import formidable from "formidable";

const uploadDir = path.join(process.cwd(), "uploads");

export const saveFile = async (file: formidable.File) => {
  const data = fs.readFileSync(file.path);
  const filePath = path.join(uploadDir, file.newFilename);
  fs.writeFileSync(filePath, data);
  fs.unlinkSync(file.path); // Clean up temporary file
  return {
    filePath: `/uploads/${file.newFilename}`,
    fileName: file.newFilename,
  };
};
