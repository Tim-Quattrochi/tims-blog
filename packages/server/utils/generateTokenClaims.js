export default function generateTokenClaims(user) {
  const expDate = new Date();
  expDate.setDate(expDate.getDate() + 7);

  const issueDate = new Date();

  return {
    sub: user._id,
    exp: expDate.getTime(),
    iat: issueDate.getTime(),
  };
}
