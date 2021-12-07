function setJWTCookie(res, JWT) {
  res.cookie(
    'jwt',
    JWT,
    {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false
    }
  );
}

module.exports = setJWTCookie;