import keys from "../configs/keys";

export default function generateTokenClaims(user) {
  const issueDate = new Date();

  return {
    sub: user._id,
    exp: keys.jwt.expiresIn,
    iat: issueDate.getTime(),
  };
}
