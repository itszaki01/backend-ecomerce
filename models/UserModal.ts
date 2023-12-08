import mongoose from "mongoose";
import { TUserSchema } from "../@types/User.type";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema<TUserSchema>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
            select: false,
        },
        passwordChangedAt: {
            type: Date,
            default: Date.now(),
        },
        passwordResetCode: {
            type: String,
        },
        passwordResetCodeExpires: {
            type: Date,
        },
        passwordResetVerified: {
            type: Boolean,
        },
        profileImg: {
            type: String,
        },
        phone: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        wishlist:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
            }
        ]
    },
    { timestamps: true }
);

function setImageUrl(doc: any) {
    if (doc.profileImg) {
        const imageUrl = `${process.env.BASE_URL}/users/${doc.profileImg}`;
        doc.profileImg = imageUrl;
    }
}
userSchema.post("init", function (doc) {
    setImageUrl(doc);
});
userSchema.post("save", function (doc) {
    setImageUrl(doc);
});

//hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

export const User = mongoose.model("User", userSchema);
