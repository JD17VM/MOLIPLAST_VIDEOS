import React from 'react';
import { AbsoluteFill } from 'remotion';

const Producto = ({ enlace_imagen, texto, precio, relativeFrame, fps }) => {
    // Aquí puedes mantener las transformaciones y animaciones
    // (el código que ya tienes) para cada producto.
    
    // Ejemplo simplificado:
    return (
        <AbsoluteFill
            style={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <img
                src={enlace_imagen}
                alt="Producto"
                style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "contain",
                }}
            />
            <h1>{texto}</h1>
            <h2>{precio}</h2>
        </AbsoluteFill>
    );
};

export { Producto };
