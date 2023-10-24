const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura CORS para permitir solicitudes desde http://localhost:3001
app.use(cors({ origin: "http://localhost:3001" }));

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
});

//cargo las rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

/*
// Ruta para obtener un usuario por su ID
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await db.one("SELECT * FROM users WHERE id = $1", userId);
    res.json(user);
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${userId}: `, error);
    res
      .status(500)
      .json({ error: `Error al obtener el usuario con ID ${userId}` });
  }
});

// Ruta para eliminar un usuario
app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
Lista de Usuarios Registrados
  try {
    const user = await db.one(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      userId
    );
    res.json(user);
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${userId}: `, error);
    res
      .status(500)
      .json({ error: `Error al eliminar el usuario con ID ${userId}` });
  }
});

*/
app.listen(3000, () => {
  console.log("Servidor Node.js en ejecución en el puerto 3000");
});
