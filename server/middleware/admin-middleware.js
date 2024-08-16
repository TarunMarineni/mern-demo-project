const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res
        .status(400)
        .json({ message: "User no have privilages to access the data" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
