import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      minLength: [5, 'Email must be at least 5 characters long.'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required.'],
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);
export default User;
