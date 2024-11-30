import * as fs from 'fs';
import * as path from 'path';

interface CreateOperationFileOptions {
    featureName: string;
    operationName: string;
    baseDir: string;
}

interface DeleteOperationFileOptions {
    featureName: string;
    operationName: string;
    baseDir: string;
}

export function createOperationFile(options: CreateOperationFileOptions): { success: boolean, message: string } {
    const { featureName, operationName, baseDir } = options;
    const controllersDir = path.join(baseDir, 'controllers', featureName);

    try {
        if (!fs.existsSync(controllersDir)) {
            return { success: false, message: "Feature directory not found" };
        }

        const filePath = path.join(controllersDir, `${operationName}.ts`);

        if (fs.existsSync(filePath)) {
            return { success: false, message: "Operation file already exists" };
        }

        const fileContent = `export default (req: Request, res: any) => {\n  return res.json({\n    message: \"some message\",\n  });\n};\n`;

        fs.writeFileSync(filePath, fileContent);

        return { success: true, message: "Operation file created successfully" };

    } catch (error) {
        console.error("Error creating operation file:", error);
        return { success: false, message: "An error occurred creating the operation file" };
    }
}

export function deleteOperationFile(options: DeleteOperationFileOptions): { success: boolean, message: string } {
    const { featureName, operationName, baseDir } = options;
    const controllersDir = path.join(baseDir, 'controllers', featureName);

    try {
        const filePath = path.join(controllersDir, `${operationName}.ts`);

        if (!fs.existsSync(filePath)) {
            return { success: false, message: "Operation file does not exist" };
        }

        fs.unlinkSync(filePath);

        return { success: true, message: "Operation file deleted successfully" };

    } catch (error) {
        console.error("Error deleting operation file:", error);
        return { success: false, message: "An error occurred deleting the operation file" };
    }
}
