const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3001;

// Ruta para recibir los datos del formulario
app.post('/generate-video', (req, res) => {
    const inputData = req.body;

    // Imprimir los datos recibidos en la consola
    console.log('Datos recibidos del formulario:', inputData);

    // Responder al cliente con un mensaje de éxito
    res.send({ message: 'Datos recibidos correctamente', data: inputData });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
