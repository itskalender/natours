function setBodyTourAndUserIds(req, res, next) {
  const { body }        = req;
  const { id: userId }  = req.user;
  const { tourId }      = req.params;

  body.author = body.author ? body.author : userId;
  body.tour   = body.tour   ? body.tour   : tourId;

  next();
}

module.exports = setBodyTourAndUserIds;