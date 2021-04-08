module.exports = function error(res, req, next) {
  res.status(500).send("somthing failed");
};
