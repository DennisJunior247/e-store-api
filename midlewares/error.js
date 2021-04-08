function error(req, res, next) {
  const error = new Error("not found");
  error.status = 404;
  next(error);
}

function error500(error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      error: error.message,
    },
  });
}

module.exports.error = error;
module.exports.error500 = error500;
