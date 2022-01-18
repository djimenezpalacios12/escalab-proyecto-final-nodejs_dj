// Validar para el Signup, firstName, lastName, email, hashedPass, rut
exports.userSignupValidator = (req, res, next) => {
  req.check("firstname", "Debe Ingresar su nombre").notEmpty();
  req.check("lastname", "Debe Ingresar su apellido").notEmpty();
  req.check("email", "debe ingresar su email")
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Su email debe contener el formato con @");
  req.check("hashedpass", "Debe ingresar su password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password debe contener minimo 6 caracteres")
    .matches(/\d/)
    .withMessage("Password debe contener un mínimo un número")
    .matches(/[A-Z]/)
    .withMessage("Password debe contener mayúsculas")
    .matches(/[a-z]/)
    .withMessage("Password debe contener minúsculas");
  req.check("rut", "Debe Ingresar su rut")
    .notEmpty()
    .matches(/^[0-9]{7,8}[-|‐]{1}[0-9kK]{1}$/)
    .withMessage("Debe ingresar su rut en el formato 12345678-9");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};