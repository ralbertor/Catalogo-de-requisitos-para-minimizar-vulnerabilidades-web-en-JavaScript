const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");
const csurf = require("csurf");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 3000;

//  Parsear datos de formularios
app.use(express.urlencoded({ extended: true }));

//  Configuración de sesiones (1 minuto de duración)
app.use(session({
    secret: "contraseña",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60000 // 1 minuto en milisegundos
    }
}));

// Protección CSRF (después de session)
app.use(csurf());

// Limitador de intentos en login (fuerza bruta)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Máximo 5 intentos
    message: "Demasiados intentos de inicio de sesión. Inténtalo de nuevo más tarde."
});

// Almacén de usuarios en memoria (para pruebas)
const users = {}; 
// Estructura: { username: { hashedPassword, email, age } }

// Configurar EJS y rutas de estáticos
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal (index)
app.get("/", (req, res) => {
    res.render("index", { 
        username: req.session.username || null, 
        message: req.session.message || null,
        csrfToken: req.csrfToken()
    });
    req.session.message = null;
});

// Ruta de depuración (opcional, no en producción)
app.get("/debug-users", (req, res) => {
    res.json(users);
});

// Login (GET)
app.get("/login", (req, res) => {
    res.render("login", { error: null, csrfToken: req.csrfToken() });
});

// Procesar login (POST) con limitador de intentos
app.post("/login", loginLimiter, async (req, res) => {
    const { username, password } = req.body;

    if (!users[username] || !(await bcrypt.compare(password, users[username].hashedPassword))) {
        return res.render("login", { error: "Usuario o contraseña incorrectos", csrfToken: req.csrfToken() });
    }
    req.session.username = username;
    req.session.message = "Inicio de sesión exitoso";
    res.redirect("/");
});

// Registro (GET)
app.get("/register", (req, res) => {
    res.render("register", { error: null, csrfToken: req.csrfToken() });
});

// Procesar registro (POST)
app.post("/register", async (req, res) => {
    const { username, email, age, password } = req.body;

    if (users[username]) {
        return res.render("register", { error: "El usuario ya existe", csrfToken: req.csrfToken() });
    }

    // Contraseña: al menos 12 caracteres, mayúsculas, minúsculas, números y símbolos
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
    if (!passwordRegex.test(password)) {
        return res.render("register", { 
            error: "La contraseña debe tener al menos 12 caracteres, una letra mayúscula, una minúscula, un número y un símbolo",
            csrfToken: req.csrfToken()
        });
    }

    // Hashear la contraseña y guardar
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { hashedPassword, email, age };
    console.log("Usuarios en memoria:", users);

    req.session.message = "Registro exitoso. Inicia sesión.";
    res.redirect("/login");
});

// Cerrar sesión (GET) para evitar problemas de CSRF
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.redirect("/");
        }
        res.redirect("/");
    });
});

// Ejemplo de sanitización de parámetros con encodeURIComponent
app.get("/buscar", (req, res) => {
    const query = req.query.query || "";
    const safeQuery = encodeURIComponent(query);
    res.send(`Buscando resultados para: ${safeQuery}`);
});

// Manejador global de errores para CSRF
app.use((err, req, res, next) => {
    if (err.code === "EBADCSRFTOKEN") {
        res.status(403).send("Error: Token CSRF inválido. Por favor, recarga la página e inténtalo de nuevo.");
    } else {
        next(err);
    }
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
