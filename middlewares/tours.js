const checkTourId = (_, res, next, val) => {
  if (val > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      data: 'Cannot find a tour with this id❗'
    })
  }

  next();
}

const checkReqBody = (req, res, next) => {
  const { body } = req;

  if (body.name === undefined || body.price === undefined) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing tour name or tour price❗'
    })
  }

  next();
}

module.exports = {
  checkTourId,
  checkReqBody
}