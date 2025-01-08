import React, { useState } from 'react';
import './App.css';
import imageHelper from './utils/imageHelper';

export default function App() {
  const [formData, setFormData] = useState([
    { name: '', price: '', file: null },
    { name: '', price: '', file: null },
    { name: '', price: '', file: null },
    { name: '', price: '', file: null },
  ]);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index][field] = value;
    setFormData(updatedFormData);
  };

  const handleFileChange = (index, file) => {
    const updatedFormData = [...formData];
    updatedFormData[index].file = file;
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    try {
      const jsonObjects = formData.map(({ name, price, file }) => ({
        name,
        price,
        file: file ? file.name : null, // Aquí puedes ajustar cómo manejar los archivos
      }));

      const response = await fetch('http://localhost:3001/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonObjects),
      });

      const result = await response.json();

      if (response.ok) {
        alert('¡Videos generados exitosamente!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error enviando los datos:', error);
      alert('Hubo un error al generar los videos.');
    } finally {
      setIsGenerating(false);  // Restablecer el estado después de la respuesta
    }
  };

  return (
    <>
    <div className="container" style={{
      width:"100vw",
      height: "100px"
    }}>
      <img style={{
        height: "90%"
      }} src={imageHelper.Logo_Moliplast} alt="" />
    </div>
    <div className="container mt-4">
      <div className="row">
        {formData.map((data, index) => (
          <div className="col-md-3" key={index}>
            <div className="card" style={{ width: 'auto' }}>
              <div className="mb-3">
                <label className="form-label">Nombre Producto</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={data.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="S/. 1450.00"
                  value={data.price}
                  onChange={(e) => handleChange(index, 'price', e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-success mt-5"
        onClick={handleSubmit}
        disabled={isGenerating} // Deshabilitar el botón mientras se genera el video
      >
        {isGenerating ? 'Generando Video ...' : 'Crear Video'}  {/* Cambiar texto según el estado */}
      </button>

      <div>
        
      </div>
    </div>
    </>
  );
}
