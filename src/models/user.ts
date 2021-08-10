import mongoose from "mongoose";
import { IMongooseDefaultProperties } from "../interface/mongooseDocument";
import Password from "../services/password";

// Interface that describes props needed to create a new User
interface IUserAttributes {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
}

// Interface that describes props a User document has
interface IUserDocument extends IUserAttributes, IMongooseDefaultProperties {}

// Interface that describes all the properties of a User model
// It usually describes the static functions inside the model.
interface IUserModel extends mongoose.Model<IUserDocument>{
    build(attr: IUserAttributes): IUserDocument;
}

const userSchema = new mongoose.Schema<IUserDocument>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = doc._id;
            delete ret._id;
            delete ret.password;
            delete ret.updatedAt;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashedPassword = await Password.toHash(this.get('password'));
        this.set('password', hashedPassword);
        done();
    }
});

userSchema.statics.build = (attr: IUserAttributes) => {
    return new User(attr);
}

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export default User;
