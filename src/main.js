import ENVIRONMENT from "./config/environment.config.js";

import mongoose from 'mongoose';
import express from 'express'
import authRouter from "./routes/auth.router.js";
import workspaceRouter from "./routes/workspace.router.js";
import randomMiddleware from "./middlewares/random.middleware.js";
import mailTransporter from "./config/mailTransporter.config.js";
import cors from 'cors'


// Conexión a MongoDB actualizada
mongoose.connect(ENVIRONMENT.MONGO_URI)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));


const app = express()

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:5173', // Permitir solicitudes desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Permitir cookies si es necesario
}))


app.use(express.json())

//Todas las consultas que empiezen con /api/auth va a ser gestionadas por el authRouter
app.use('/api/auth', authRouter)
app.use('/api/workspace', workspaceRouter)


/* mailTransporter.sendMail(
    {
        from: ENVIRONMENT.GMAIL_USER, //Desde quien
        to:  'mati.dev.gimenez@gmail.com', //Hacia adonde enviar
        subject: 'Mail de prueba', //asunto
        html: `<h1>Hola desde node js</h1>` //Body del mail
    }
) */


app.listen(
    ENVIRONMENT.PORT || 8080,
    () => {
        console.log(`Tu servidor se esta ejecutando correctamente en el puerto ${ENVIRONMENT.PORT}`)
    }
)