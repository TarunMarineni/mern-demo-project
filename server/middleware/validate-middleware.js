const validationMiddleware = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    // res.status(401).json({ message: err.errors[0].message });
    next({ status: 400, message: err.errors[0].message });
  }
};

module.exports = validationMiddleware;
