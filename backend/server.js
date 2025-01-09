const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process'); // Para ejecutar comandos en terminal
const fs = require('fs'); // <--- IMPORTACIÓN CORRECTA
const path = require('path'); // <--- Asegúrate de incluir esta línea

const app = express();

app.use(cors());
app.use(bodyParser.json()); // Necesario para que Express pueda manejar solicitudes JSON

const PORT = 3001;

app.use('/assets', express.static('public/assets'));

// Ruta para recibir los datos del formulario
app.post('/generate-video', (req, res) => {
    const { data: inputData, metadata } = req.body;

    // Verificar que inputData sea un array antes de intentar mapearlo
    if (!Array.isArray(inputData)) {
        return res.status(400).send({ message: 'Se esperaba un array de datos en el campo "data"' });
    }

    // Verificar que metadata exista y tenga nombre_video
    if (!metadata || !metadata.nombre_video) {
        return res.status(400).send({ message: 'Se requiere metadata con nombre_video' });
    }

    // Mapea los datos al formato esperado por Remotion (asumiendo que cada producto puede ser único o doble)
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

    // Definir la ruta del archivo JSON
    const inputPath = path.resolve(__dirname, 'input.json').replace(/\\/g, '/');

    // Escribir el archivo JSON
    fs.writeFileSync(inputPath, JSON.stringify(formattedData, null, 2)); // Guarda en formato JSON

    console.log('Archivo JSON generado en:', inputPath);
    console.log('Datos contenidos:', formattedData);

    // Generar nombre del archivo de salida basado en metadata
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
