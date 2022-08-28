const jwt = require("jsonwebtoken");
const { loginUser } = require("./auth.controllers");

const login = (req, res) => {
  const data = req.body;

  if (!data.email || !data.password) {
    //? aqui validamos que recibimos los datos.
    res.status(400).json({ message: "Missing Data" });
  }

  const response = loginUser(data.email, data.password);

  if (response) {
    //? aqui validamos que los datos recibidos sean validos.

    const token = jwt.sign(
      {
        id: response.id,
        email: response.email,
        rol: response.rol,
      },
      "palabra_secreta"
    );

    res
      .status(200)
      .json({ message: "Tus credenciales son correctas", token: token });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};

module.exports = {
  login,
};
