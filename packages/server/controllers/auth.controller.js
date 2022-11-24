import { User } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../configs/keys';
import { generateTokenClaims } from '../utils';

const JWT_SECRET = keys.jwt.secret;

export const signUp = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(422).json({ error: 'All fields required.' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(422)
        .json({ error: 'User with that email already exists.' });
    }

    if (password !== confirmPassword) {
      return res
        .status(422)
        .json({ error: 'Passwords do not match.' });
    }

    const passwordHash = bcrypt.hashSync(password, 12);

    const newUser = await User.create({ email, passwordHash });

    const claims = generateTokenClaims(newUser);

    const token = jwt.sign(claims, JWT_SECRET);

    res.json({ token, email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: 'All fields required.' });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(422)
        .json({ error: 'Invalid email/password.' });
    }

    const passwordsMatch = bcrypt.compareSync(
      password,
      existingUser.passwordHash
    );

    if (!passwordsMatch) {
      return res
        .status(422)
        .json({ error: 'Invalid email/password.' });
    }

    const claims = generateTokenClaims(existingUser);

    const token = jwt.sign(claims, JWT_SECRET);

    res.json({ token, email });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
