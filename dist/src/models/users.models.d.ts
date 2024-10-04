import mongoose from 'mongoose';
declare const User: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    storeName: string;
    countryCode: string;
    phoneNumber: string;
    storeDescription?: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    storeName: string;
    countryCode: string;
    phoneNumber: string;
    storeDescription?: string;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    storeName: string;
    countryCode: string;
    phoneNumber: string;
    storeDescription?: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    toObject: {
        virtuals: true;
    };
    toJSON: {
        virtuals: true;
    };
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    storeName: string;
    countryCode: string;
    phoneNumber: string;
    storeDescription?: string;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    storeName: string;
    countryCode: string;
    phoneNumber: string;
    storeDescription?: string;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    storeName: string;
    countryCode: string;
    phoneNumber: string;
    storeDescription?: string;
} & {
    _id: mongoose.Types.ObjectId;
}>>;
export default User;
