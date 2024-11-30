import * as fs from 'fs';
import * as path from 'path';

interface CopyOptions {
    sourceDir: string;
    targetDir: string;
    folderName: string;
}

export function copyFolder(options: CopyOptions): { success: boolean, message: string } {
    const { sourceDir, targetDir, folderName } = options;

    try {
        if (!fs.existsSync(sourceDir)) {
            return { success: false, message: "Source directory not found" };
        }

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const targetPath = path.join(targetDir, folderName);

        if (fs.existsSync(targetPath)) {
            return { success: false, message: "Target folder already exists" };
        }

        fs.mkdirSync(targetPath, { recursive: true });
        fs.cpSync(sourceDir, targetPath, { recursive: true });

        return { success: true, message: "Folder copied successfully" };

    } catch (error) {
        console.error("Error during folder copy:", error);
        return { success: false, message: "An error occurred during folder copy" };
    }
}
