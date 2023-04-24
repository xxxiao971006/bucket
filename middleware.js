module.exports = {
  checkIfLoggedIn: (req, res, next) => {
    if (req.isLoggedIn) {
      next();
    } else {
      res.redirect("/login");
    }
  },
  loginWall: (req, res, next) => {
    if (req.isLoggedIn) {
      res.redirect("/");
    } else {
      next();
    }
  },
};
