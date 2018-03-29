export default (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization");

  return next();
};
