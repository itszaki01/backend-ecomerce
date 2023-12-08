import express from "express";

import { allowTo, auth } from "../services/authService";
import { createReview, deleteReview, getAllReviews, getReview, updateReview } from "../services/ReviewService";
import { filterObj } from "../middlewares/filterObjMw";
import { createReviewValidator, deleteReviewValidator, getReviewValidator, updateReviewValidator } from "../utils/validators/ReviewValidators";
import { idChecker } from "../utils/checkers/idChecker";

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(filterObj, getAllReviews)
    //create review handler
    .post(
        auth,
        allowTo("user"),
        async (req, _, next) => {
            const _req = req as any;
            _req.body.user = _req.user.id;
            if(_req.params.productID) _req.body.product = _req.params.productID;
            next();
        },
        createReviewValidator,
        createReview
    );

router.route("/:id").get(getReviewValidator,getReview).put(auth, allowTo("user"),updateReviewValidator, updateReview).delete(auth, allowTo("user", "admin"),deleteReviewValidator, deleteReview);

export const ReviewRoute = router;
