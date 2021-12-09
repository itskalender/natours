function setAuthIdToParam(req, _, next) {
  const { user }  = req;
  req.params.id   = user.id;

  next();
}

module.exports = setAuthIdToParam;