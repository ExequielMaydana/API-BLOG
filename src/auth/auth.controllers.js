const { getUserByEmail } = require("../users/users.controllers");
const { comparePassword } = require("../utils/crypt");

const loginUser = (email, password) => {
  const user = getUserByEmail(email);
  if (user) {
    //? si el usuario existe entra en esta condicional y hace la comparacion de passwords, si no existe salta al -> return false;
    const verify_password = comparePassword(password, user.password);
    if (verify_password) {
      //? si la comparacion que se guarda en -> verify_password es TRUE, entra al if y retornamos el usuario con toda su data.
      return user;
    }
  }
  return false;
};

// console.log(loginUser('mign@gmail.com', 'hercules'));

module.exports = {
  loginUser,
};

//? el parametro de loginUser -> password, es la contraseña en texto plano.
//? la user.password es la contraseña haseada que viene desde la DB de los users.

//? Y en verify_password usando comparePassword que viene desde -> crypt.js,
//? comparamos que la conseña en texto plano con la haseada para ver si coinciden
//? y asi el usuario pueda hacer login.
