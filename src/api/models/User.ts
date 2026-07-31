import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define an interface representing a document in MongoDB.
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  create_at: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Define the schema corresponding to the document interface.
const userSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    create_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Middleware to run before saving a document to hash the password.
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare encrypted passwords.
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create a corresponding model based on the schema and interface.
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
