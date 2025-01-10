const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3001;

app.use('/assets', express.static('public/assets'));

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self';");
    next();
});

// Ruta para recibir los datos del formulario
app.post('/generate-video', (req, res) => {
    const { data: inputData, metadata } = req.body;

    if (!Array.isArray(inputData)) {
        return res.status(400).send({ message: 'Se esperaba un array de datos en el campo "data"' });
    }

    if (!metadata || !metadata.nombre_video) {
        return res.status(400).send({ message: 'Se requiere metadata con nombre_video' });
    }

    const formattedData = {
        data: inputData.map((item) => {
            if (item.producto_doble) {
                return {
                    producto_doble: true,
                    enlace_imagen_1: item.enlace_imagen_1,
                    texto_1: item.texto_1,
                    precio_1: item.precio_1,
                    enlace_imagen_2: item.enlace_imagen_2,
                    texto_2: item.texto_2,
                    precio_2: item.precio_2,
                };
            } else {
                return {
                    producto_doble: false,
                    enlace_imagen: item.enlace_imagen,
                    texto: item.texto,
                    precio: item.precio,
                };
            }
        }),
        metadata: {
            nombre_video: metadata.nombre_video
        }
    };

    const inputPath = path.resolve(__dirname, 'input.json').replace(/\\/g, '/');

    fs.writeFileSync(inputPath, JSON.stringify(formattedData, null, 2));

    console.log('Archivo JSON generado en:', inputPath);
    console.log('Datos contenidos:', formattedData);

    const outputFileName = `${metadata.nombre_video}.mp4`;
    const command = `cd moliplast_video_plantilla && npx remotion render --props=../input.json Productos ../output/${outputFileName}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error generando el video: ${error.message}`);
            return res.status(500).send({ message: 'Error al generar el video' });
        }
        if (stderr) console.error(`STDERR: ${stderr}`);
        
        console.log(`STDOUT: ${stdout}`);
        res.send({ 
            message: 'Video generado con éxito', 
            path: `/output/${outputFileName}` 
        });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
