import expressAsyncHandler from "express-async-handler";
import multer, { FileFilterCallback } from "multer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../utils/apiError";

const memoryStoreage = multer.memoryStorage();
const uploadImage = (fieldName: "image" | "imageCover" = "image") => {
    const imageFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            //@ts-ignore
            cb(new ApiError("Only Images allowed", 500), false);
        }
    };

    //@ts-ignore
    const upload = multer({ storage: memoryStoreage, fileFilter: imageFilter });
    //UploadImage
    return upload.single(fieldName);
};

//ResizeImage
const resizeImg = (pathName: "category" | "brand" | "product", imgSize = 500) =>
    expressAsyncHandler(async (req, res, next) => {
        const filename = `${pathName}-${uuidv4()}-${Date.now()}.jpeg`;
        await sharp(req.file?.buffer)
            .resize(imgSize, imgSize)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`uploads/${pathName}/${filename}`);

        if (pathName === "product") {
            req.body.imageCover = filename;
        } else {
            req.body.image = filename;
        }
        next();
    });

export const uploadOneImg = (pathName: "category" | "brand", imgSize?: number, fieldName: "image" | "imageCover" = "image") => [
    uploadImage(),
    resizeImg(pathName, imgSize),
];
