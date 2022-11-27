import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import keys from '../configs/keys';
import { User } from '../models';

const JWT_SECRET = keys.jwt.secret;

export default async function requireAuth(req, res, next) {
  const authorization = req.get('authorization');

  console.log(authorization);

  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');
  console.log(token);

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid user/pass' });
    }

    const { sub, exp } = payload;

    if (exp < new Date()) {
      return res.status(401).json({ error: 'Token has expired.' });
    }

    User.findById(sub)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        res.status(500).json({ error: 'Something went wrong.' });
      });
  });
}
