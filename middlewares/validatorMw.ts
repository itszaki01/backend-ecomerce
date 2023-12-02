import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const validatorMw: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errosLength = errors.array().length;
        let message = "";
        if (errosLength > 1) {
            errors.array().map((err, i) => (message += `${i + 1}: ${err.msg} ${errosLength != i + 1 ? "& " : ""}`));
        } else {
            message = `${errors.array()[0].msg}`;
        }
        return res.status(400).json({
            status: "fail",
            message:message.trimEnd(),
            totalErrors: errosLength,
            errors:errors.array(),
        });
    }
    next();
};
