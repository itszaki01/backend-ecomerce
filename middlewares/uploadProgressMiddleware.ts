import expressAsyncHandler from "express-async-handler";

export const uploadProgressMiddleware = expressAsyncHandler((req, res, next) => {
    //@ts-ignore
    let totalBytes = req.headers['content-length'] ? parseInt(req.headers['content-length']) : 0;
    let uploadedBytes = 0;
    console.log('called')
    

    req.on("data", (chunk) => {
        uploadedBytes += chunk.length;
        const percentage = (uploadedBytes / totalBytes) * 100;
        console.log(`Uploaded ${Math.trunc(percentage)}% of 100% bytes`);
    });

    req.on("end", () => {
        console.log("Upload completed");
        
    });
   
    // Call the next middleware or route handler
    next();
});
