import React, { useState } from 'react';
import './App.css';
import imageHelper from './utils/imageHelper';

import './assets/styles/estilos_generales.css';

export default function App() {
  const [formData, setFormData] = useState([
    { name: '', price: '', file: null },
    { name: '', price: '', file: null },
    { name: '', price: '', file: null },
    { name: '', price: '', file: null },
    { name: '', price: '', file: null },
    { name: '', price: '', file: null },
  ]);

  const [metadata, setMetadata] = useState({
    nombre_video: ''
  });
  

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index][field] = value;
    setFormData(updatedFormData);
  };

  const handleMetadataChange = (value) => {
    setMetadata({
      ...metadata,
      nombre_video: value
    });
  };

  const handleFileChange = (index, file, imageNumber) => {
    if (!file) return;

    const updatedFormData = [...formData];
    if (updatedFormData[index].producto_doble) {
      // Si es producto doble, usa el imageNumber para determinar cuál imagen actualizar
      if (imageNumber === 1) {
        updatedFormData[index].enlace_imagen_1 = file.name;
      } else {
        updatedFormData[index].enlace_imagen_2 = file.name;
      }
    } else {
      updatedFormData[index].enlace_imagen = file.name;
    }
    setFormData(updatedFormData);
  };

  const toggleProductoDoble = (index) => {
    const updatedFormData = [...formData];
    const isDoble = !updatedFormData[index].producto_doble;

    // Cambiar el tipo de formulario y reiniciar los campos específicos
    updatedFormData[index] = isDoble
      ? {
        producto_doble: true,
        enlace_imagen_1: '',
        texto_1: '',
        precio_1: '',
        enlace_imagen_2: '',
        texto_2: '',
        precio_2: '',
      }
      : {
        producto_doble: false,
        enlace_imagen: '',
        texto: '',
        precio: '',
      };

    setFormData(updatedFormData);
  };


  const handleSubmit = async () => {
    setIsGenerating(true);
    try {
      // Crear un objeto con los datos del formulario
      const jsonObjects = formData.map((data) =>
        data.producto_doble
          ? {
            producto_doble: true,
            enlace_imagen_1: data.enlace_imagen_1 || null,
            texto_1: data.texto_1,
            precio_1: data.precio_1,
            enlace_imagen_2: data.enlace_imagen_2 || null,
            texto_2: data.texto_2,
            precio_2: data.precio_2,
          }
          : {
            producto_doble: false,
            enlace_imagen: data.enlace_imagen || null,
            texto: data.texto,
            precio: data.precio,
          }
      );

       // Crear el objeto final incluyendo metadata
       const finalData = {
        data: jsonObjects,
        metadata: {
          nombre_video: metadata.nombre_video
        }
      };

      // Imprimir el JSON en consola para revisarlo
      console.log("JSON a enviar:", JSON.stringify(finalData, null, 2));

      // Aquí comentaríamos el envío de datos al servidor por ahora
      const response = await fetch('http://localhost:3001/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      // Simulación de respuesta (comentado):
      if (response.ok) {
        alert('¡Videos generados exitosamente!');
      } else {
        const result = await response.json();
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error enviando los datos:', error);
      alert('Hubo un error al generar los videos.');
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <>
      <div className="container" style={{
        width: "100vw",
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{
        color: "white",
        fontSize: "2.5rem",
        fontWeight: "700"
      }}>GENERADOR DE VIDEOS MOLIPLAST</h1>
        <img style={{
          height: "90%"
        }} src={imageHelper.Logo_Moliplast} alt="" />
      </div>
      <div className="container mt-4"> 
        <div className="row" style={{
          rowGap:"2rem",
        }}>
          {formData.map((data, index) => (
            <div className="col-md-4" key={index}>
              <div className="card" style={{ width: 'auto' }}>
                {/* Selector para cambiar entre Único y Doble */}
                <div className="mb-3">
                  <label className="form-label" >Tipo de Producto</label>
                  <select
                    className="form-select"
                    value={data.producto_doble ? 'doble' : 'unico'}
                    onChange={() => toggleProductoDoble(index)}
                  >
                    <option value="unico">Producto Único</option>
                    <option value="doble">Producto Doble</option>
                  </select>
                </div>

                {data.producto_doble ? (
                  // Formulario para Producto Doble
                  <>
                    <div className="mb-3">
                      <label className="form-label">Imagen Producto 1</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => handleFileChange(index, e.target.files[0], 1)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Texto Producto 1</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={data.texto_1}
                        onChange={(e) => handleChange(index, 'texto_1', e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Precio Producto 1</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="S/. 1450.00"
                        value={data.precio_1}
                        onChange={(e) => handleChange(index, 'precio_1', e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Imagen Producto 2</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => handleFileChange(index, e.target.files[0], 2)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Texto Producto 2</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={data.texto_2}
                        onChange={(e) => handleChange(index, 'texto_2', e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Precio Producto 2</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="S/. 1450.00"
                        value={data.precio_2}
                        onChange={(e) => handleChange(index, 'precio_2', e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  // Formulario para Producto Único
                  <>
                    <div className="mb-3">
                      <label className="form-label">Imagen Producto</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Texto Producto</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={data.texto}
                        onChange={(e) => handleChange(index, 'texto', e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Precio Producto</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="S/. 1450.00"
                        value={data.precio}
                        onChange={(e) => handleChange(index, 'precio', e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="container mt-4">
          <div class="row">
              <div class="input-group" style={{
                width: "70%",
              }}>
              <span className="input-group-text" id="basic-addon1">Nombre del video</span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Nombre del video" 
                  value={metadata.nombre_video}
                  onChange={(e) => handleMetadataChange(e.target.value)}
                />
            </div>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={isGenerating} // Deshabilitar el botón mientras se genera el video
                style={{
                  width: "30%",
                  backgroundColor: "#3C45FC",
                  fontWeight: "700"
                }}
              >
                {isGenerating ? 'Generando Video ...' : 'Crear Video'}  {/* Cambiar texto según el estado */}
              </button>
          </div>


        </div>


        <div>

        </div>
      </div>
    </>
  );
}
