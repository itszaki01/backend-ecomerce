import expressAsyncHandler from "express-async-handler";
import multer, { FileFilterCallback } from "multer";
import { ApiError } from "../utils/apiError";
import { TProductREQ } from "../@types/Product.type";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

export const uploadImages = () => {
    const memoryStoreage = multer.memoryStorage();

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
    return upload.fields([
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 5 },
    ]);
};

export const imagesRsizer = expressAsyncHandler(async (req, res, next) => {
    const _req = req as any;
    if (_req.files.imageCover) {
        const filename = `products-${uuidv4()}-${Date.now()}.jpeg`;
        await sharp(_req.files.imageCover[0].buffer)
            .resize(500, 500)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`uploads/product/${filename}`);
            _req.body.imageCover = filename
    }
    if (req.files) {
        req.body.images = await Promise.all(
            _req.files.images.map(async (img,idx) => {
                const filename = `products-${uuidv4()}-${Date.now()}${idx}.jpeg`;
                await sharp(img.buffer).resize(500, 500).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`uploads/product/${filename}`);
                return filename;
            })
        );
    }
    next()
});
