const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process'); // Para ejecutar comandos en terminal
const fs = require('fs'); // <--- IMPORTACIÓN CORRECTA
const path = require('path'); // <--- Asegúrate de incluir esta línea

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3001;

// Ruta para recibir los datos del formulario
app.post('/generate-video', (req, res) => {
    const inputData = req.body;

    // Mapea los datos al formato esperado por Remotion
    const formattedData = {
        data: inputData.map((item) => ({
            enlace_imagen: item.file,
            texto: item.name,
            precio: item.price,
        }))
    };

    const inputPath = path.resolve(__dirname, 'input.json').replace(/\\/g, '/');

    fs.writeFileSync(inputPath, JSON.stringify(formattedData, null, 2)); // Guarda en formato JSON

    console.log('Archivo JSON generado en:', inputPath);
    console.log('Datos contenidos:', formattedData);

    const command = `cd moliplast_video_plantilla && npx remotion render --props=../input.json ProductoUnico ../output/video.mp4`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error generando el video: ${error.message}`);
            return res.status(500).send({ message: 'Error al generar el video' });
        }
        if (stderr) console.error(`STDERR: ${stderr}`);
        
        console.log(`STDOUT: ${stdout}`);
        res.send({ message: 'Video generado con éxito', path: '/output/video.mp4' });
    });
});



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
