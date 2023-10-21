const db = require("../dataBase/bddConfig");

const findAllUsers = async (req, res) => {
  try {
    const users = await db.any("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios: ", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  try {
    const user = await db.one(
      "UPDATE users SET nombre = $1, apellido = $2, correo_electronico = $3, nombre_usuario = $4, contrasena = $5, rol_id = $6 WHERE id = $7 RETURNING *",
      [
        updatedUser.nombre,
        updatedUser.apellido,
        updatedUser.correo_electronico,
        updatedUser.nombre_usuario,
        updatedUser.contrasena,
        updatedUser.rol_id,
        userId, // El ID del usuario que deseas actualizar
      ]
    );
    res.json(user);
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${userId}: `, error);
    res
      .status(500)
      .json({ error: `Error al actualizar el usuario con ID ${userId}` });
  }
};

module.exports = {
  findAllUsers,
  updateUserById,
};
