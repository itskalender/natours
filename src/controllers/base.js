const { 
  catchAsync,
  AppError
}               = require('../utils');

function deleteOne(service) {
  return catchAsync(async (req, res, next) => {
    const { id }  = req.params;
    const doc     = await service.delete(id);

    if (!doc) {
      return next(new AppError('Cannot find a document with this id.', 404));
    }
  
    res.status(204).json({
      message: 'success',
      data: null
    });
  });
}

module.exports = {
  deleteOne
}