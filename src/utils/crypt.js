const bcrypt = require("bcrypt");

//? ambas son sincronas.

//* aqui encriptamos la contraseña
const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 10);
};

//* comparamos la contraseña en texto plano con la encriptada.
//* en comparePassword recibimos "hashedPassword", es la contraseña ya encriptada
const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
