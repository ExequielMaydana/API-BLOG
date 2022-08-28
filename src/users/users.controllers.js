//* utilizamos uuid para generar un id unico dificil de decifrar.
const uuid = require("uuid");

const { hashPassword } = require('../utils/crypt')

const usersDB = [];

//? controlador para obtener todos los usuarios.
const getAllUser = () => {
  return usersDB;
};

//? controlador para obtener un usuario en especifico.
const getAllUserById = (id) => {
  const data = usersDB.filter((user) => user.id === id);
  return data.length ? data[0] : null;
};

//? controlador para crear un usuario nuevo.
const getCreateUser = (data) => {
  const newUser = {
    id: uuid.v4(),
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: hashPassword(data.password),
    phone: data.phone ? data.phone : "",
    birthday_date: data.birthday_date,
    rol: "normal",
    profile_image: data.profile_image ? data.profile_image : "",
    country: data.country,
    is_active: true,
    verified: false,
  };
  usersDB.push(newUser);
  return newUser;
};

//? controlador para editar un usuario.
const getUpdateUser = (id, data) => {
    const index = usersDB.findIndex((user) => user.id === id);
  
    if (index !== -1) {
      usersDB[index] = {
        id: id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: usersDB[index].password,
        phone: data.phone ? data.phone : "",
        birthday_date: data.birthday_date,
        rol: "normal",
        profile_image: data.profile_image ? data.profile_image : "",
        country: data.country,
        is_active: true,
        verified: false,
      };
      return usersDB[index];
    } else {
      return getCreateUser(data);
    }
  };

//? controlador para eliminar usuario.
const getDeleteUser = (id) => {
  const index = usersDB.findIndex((user) => user.id === id);
  if (index !== -1) {
    usersDB.splice(index, 1);
    return true;
  } else {
    return false;
  }
};

//? controlador para obtener info de un user a partir de su email, esta funcion la importamos en -> auth para hacer el login.
const getUserByEmail = (email) => {
    const data = usersDB.filter((item) => item.email === email);
    return data.length ? data[0] : false
    //? select * from users where email = ${email};
  }


module.exports = {
    getAllUser,
    getAllUserById,
    getCreateUser,
    getDeleteUser,
    getUpdateUser,
    getUserByEmail,
}