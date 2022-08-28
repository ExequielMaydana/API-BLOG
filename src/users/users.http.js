const usersControllers = require("./users.controllers");

const getAll = (req, res) => {
  const data = usersControllers.getAllUser();
  res.status(200).json({ items: data.length, users: data });
};

const getById = (req, res) => {
  const id = req.params.id;
  const data = usersControllers.getAllUserById(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `El usuario con el ${id} no existe` });
  }
};

const getCreate = (req, res) => {
  const data = req.body;

  if (!data) {
   return res.status(400).json({ message: "Missing data" });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.password ||
    !data.birthday_date ||
    !data.country
  ) {
    return res.status(400).json({
      message: "all fields must be completed",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "example@gmail.com",
        password: "string",
        birthday_date: "DD/MM/YYYY",
        country: "string",
      },
    });
  } else {
    const response = usersControllers.getCreateUser(data);
    return res.status(201).json({
      message: `User created succesfully with: ${response.id}`,
      users: response,
    });
  }
};

const getUpdate = (req, res) => {
  const data = req.body;
  const id = req.params.id;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.password ||
    !data.phone ||
    !data.rol ||
    !data.profile_image ||
    !data.birthday_date ||
    !data.country ||
    !data.is_active
  ) {
    return res.status(400).json({
      message: 'message: "All fields must be completed',
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        password: "string",
        phone: "+544343434",
        rol: "normal",
        profile_image: "example.com/img/example.png",
        birthday_date: "DD/MM/YYYY",
        country: "string",
        is_active: true,
      },
    });
  } else {
    const response = usersControllers.getUpdateUser(id, data);
    return res.status(200).json({
      message: "User edited succesfully",
      user: response,
    });
  }
};

const getDelete = (req, res) => {
  const id = req.params.id;
  const data = usersControllers.getDeleteUser(id);
  if (data) {
    return res.status(204).json();
  } else {
    return res
      .status(400)
      .json({ message: `There is no user with this ${id}` });
  }
};


//? rutas protegidas -> /api/v1/users/me
//* GET
const getMyUser = (req, res) => {
  const id = req.user.id;
  const data = usersControllers.getAllUserById(id)
  if(data){
    res.status(200).json({data: data})
  }else{
    res.status(400).json({message: "Esta data no es disponible"})
  }
}

//* PUT
const editMyUser = (req, res) => {
    const id = req.user.id;
    const data = req.body;

    if (!Object.keys(data).length) {
      return res.status(400).json({ message: "Missing Data" });
    } else if (
      !data.first_name ||
      !data.last_name ||
      !data.email ||
      !data.phone ||
      !data.profile_image ||
      !data.birthday_date ||
      !data.country ||
      !data.is_active
    ) {
      return res.status(400).json({
        message: 'message: "All fields must be completed',
        fields: {
          first_name: "string",
          last_name: "string",
          email: "examle@examle.com",
          phone: "+544343434",
          profile_image: "example.com/img/example.png",
          birthday_date: "DD/MM/YYYY",
          country: "string",
          is_active: true,
        },
      });
    } else {
      const response = usersControllers.getUpdateUser(id, data);
      return res.status(200).json({
        message: "User edited succesfully",
        user: response,
      });
    }
}

//* DELETE
const deteleMyUser = (req, res) =>{
  const id = req.user.id;
  if(id){
    usersControllers.getDeleteUser(id)
    res.status(204).json()
  }else{
    res.status(400).json({ message: `There is no user with this ${id}` })
  }
}


module.exports = {
  getAll,
  getById,
  getCreate,
  getUpdate,
  getDelete,
  
  editMyUser,
  getMyUser,
  deteleMyUser
};
