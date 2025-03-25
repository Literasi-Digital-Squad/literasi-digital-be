import { S3Client, PutObjectCommand, ObjectCannedACL, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { AWSRegion, FailedDeleteFile, FailedUploadFile } from "./constant";

const s3 = new S3Client({
    endpoint: process.env.AWS_URL!,
    region: process.env.AWS_REGION || AWSRegion,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
});

export class CloudStorageLib {
    static async uploadS3(file: Express.Multer.File): Promise<string> {
        try {
            const fileExtension = file.originalname.split(".").pop();
            const fileName = `${uuidv4()}.${fileExtension}`;

            const buffer = file.buffer;

            const uploadParams = {
                Bucket: process.env.AWS_S3_BUCKET_NAME!,
                Key: fileName,
                Body: buffer,
                ContentType: file.mimetype,
                ACL: ObjectCannedACL.public_read,
            };

            await s3.send(new PutObjectCommand(uploadParams));

            return `${process.env.AWS_URL}/${process.env.AWS_S3_BUCKET_NAME}/${fileName}`;
        } catch (error) {
            throw new Error(FailedUploadFile);
        }
    }

    static async deleteS3(fileName: string): Promise<void> {
        try {
            const deleteParams = {
                Bucket: process.env.AWS_S3_BUCKET_NAME!,
                Key: fileName,
            };
    
            await s3.send(new DeleteObjectCommand(deleteParams));
        } catch (error) {
            throw new Error(FailedDeleteFile);
        }
    }
}
