const db = require("../dataBase/bddConfig");

const login = async (req, res) => {
  const { correo_electronico, contrasena } = req.body;
  try {
    const userRecord = await db.one(
      "SELECT * FROM users WHERE correo_electronico = $1",
      correo_electronico
    );

    // const passwordMatch = await bcrypt.compare(contrasena, userRecord.contrasena);
    const passwordMatch = contrasena === userRecord.contrasena;
    if (passwordMatch) {
      // Si las contraseñas coinciden, puedes responder con un mensaje de éxito
      res.json({ message: "Inicio de sesión exitoso", jwt: "...." });
    } else {
      // Si las contraseñas no coinciden, respondes con un estado 401 y un mensaje de error
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    // Si hay un error en la consulta SQL, respondes con un estado 500 y un mensaje de error
    console.error("Error en el inicio de sesión:", error);
    res.status(401).json({ error: "Credenciales incorrectas" });
  }
};

const signup = async (req, res) => {
  const newUser = req.body;
  try {
    const user = await db.one(
      "INSERT INTO users (nombre, apellido, correo_electronico, nombre_usuario, contrasena, rol_id) VALUES ($1, $2,$3, $4, $5,$6 ) RETURNING *",
      [
        newUser.nombre,
        newUser.apellido,
        newUser.correo_electronico,
        newUser.nombre_usuario,
        newUser.contrasena,
        newUser.rol_id,
      ]
    );
    return res.json(user);
  } catch (error) {
    console.error("Error al crear un nuevo usuario: ", error);
    return res.status(500).json({ error: "Error al crear un nuevo usuario" });
  }
};

module.exports = {
  signup,
  login,
};
