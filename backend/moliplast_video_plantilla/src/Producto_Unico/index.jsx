import { AbsoluteFill, Sequence, interpolate, spring, useVideoConfig, useCurrentFrame} from "remotion";
import { Pieza_Izquierda, Pieza_Derecha } from "./Piezas_Fondo";
import { Contenido } from "./Contenido";

import imageHelper from '../utils/imageHelper'

const screenWidth = 1920; // Ancho de la pantalla
const screenHeight = 1080; // Alto de la pantalla

const contenedor_piezas_fondo = {
  display: "flex",
  backgroundColor: "blue",
  width: "100%",
  height: "100%",
  position: "absolute",
  zIndex: 0,
};

const contenedor_contenido = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  backgroundColor: "blue",
  width: "90%",
  height: "70%",
  position: "relative",
  zIndex: 1,
  boxSizing: "border-box",
};

const contenedor_imagen = {
  backgroundColor: "yellow",
  width: "100%",
  height: "100%",
  gridRow: "span 2",
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const contenedor_texto = {
  display: "flex",
  backgroundColor: "purple",
  width: "100%",
  boxSizing: "border-box",
  justifyContent: "center",
  padding: "1rem",
};

const contenedor_precio = {
  display: "flex",
  width: "100%",
  boxSizing: "border-box",
  justifyContent: "center",
  padding: "1rem",
};


const data = [
    {
      enlace_imagen: "../imagen_A",
      texto: "Este es el primer producto",
      precio: "S/.100.00",
    },
    {
      enlace_imagen: "../imagen_B",
      texto: "Esta es la descripcion de la imagen B NUEVOdf",
      precio: "S/.210.00",
    },
    {
      enlace_imagen: "../imagen_C",
      texto: "Esta es la descripcion de la imagen C DASD",
      precio: "S/.300.00",
    },
    {
      enlace_imagen: "../imagen_D",
      texto: "Esta es la descripcion de la imagen D",
      precio: "S/.140.00",
    },
    {
      enlace_imagen: "../imagen_E",
      texto: "Esta es la descripcion de la imagen E",
      precio: "S/.190.00",
    },
  ];
  
  const Producto = ({ enlace_imagen, texto, precio, relativeFrame, fps }) => {
    const { width: screenWidth, height: screenHeight } = useVideoConfig();
    const frame = useCurrentFrame();
    
  
    // Duraciones
    const entradaDuracion = 10; // En fotogramas
    const duracionVisible = 10 * fps; // 10 segundos de visibilidad
    const salidaInicio = entradaDuracion + duracionVisible;
    const salidaDuracion = 10; // En fotogramas
  
    // Cálculo de posiciones para entrada y salida
    const imagenXOffset =
      relativeFrame < entradaDuracion
        ? interpolate(relativeFrame, [0, entradaDuracion], [screenWidth, 0], {
            extrapolateRight: "clamp",
          })
        : relativeFrame >= salidaInicio
        ? interpolate(
            relativeFrame,
            [salidaInicio, salidaInicio + salidaDuracion],
            [0, screenWidth],
            {
              extrapolateLeft: "clamp",
            }
          )
        : 0;
  
    const textoYOffset =
      relativeFrame < entradaDuracion
        ? interpolate(relativeFrame, [0, entradaDuracion], [screenHeight, 0], {
            extrapolateRight: "clamp",
          })
        : relativeFrame >= salidaInicio
        ? interpolate(
            relativeFrame,
            [salidaInicio, salidaInicio + salidaDuracion],
            [0, screenHeight],
            {
              extrapolateLeft: "clamp",
            }
          )
        : 0;
  
    const precioYOffset =
      relativeFrame < entradaDuracion
        ? interpolate(relativeFrame, [0, entradaDuracion], [-screenHeight, 0], {
            extrapolateRight: "clamp",
          })
        : relativeFrame >= salidaInicio
        ? interpolate(
            relativeFrame,
            [salidaInicio, salidaInicio + salidaDuracion],
            [0, -screenHeight],
            {
              extrapolateLeft: "clamp",
            }
          )
        : 0;
  

        const createOscillation = (amplitude, speed) =>
        amplitude * Math.sin((2 * Math.PI * frame) / (fps * speed));
      
      const imagenOscillationX = createOscillation(10, 1); // Oscilación horizontal para la imagen
      const textoOscillationY = createOscillation(15, 0.8); // Oscilación vertical para el texto
      const precioOscillationY = createOscillation(12, 0.9); // Oscilación vertical para el precio

    return (
      <AbsoluteFill
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

      <div style={{ ...contenedor_piezas_fondo }}>
        <Pieza_Izquierda />
        <Pieza_Derecha />
      </div>

      <div style={{ ...contenedor_contenido }}>
        <div
          style={{...contenedor_imagen,
            transform: `translateX(${imagenXOffset + imagenOscillationX}px)`,
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
        </div>

        <div
          style={{
            ...contenedor_texto,
            transform: `translateY(${textoYOffset + textoOscillationY}px)`,
          }}
        >
          <h1 style={{
            fontSize: "5rem",
            margin: 0,
            display: "flex",
            fontWeight: 700,
            lineHeight: "5.5rem",
          }}>{texto}</h1>
        </div>
        <div
          style={{
            ...contenedor_precio,
            transform: `translateY(${precioYOffset + precioOscillationY}px)`,
          }}
        >
          <h2 style={{
            margin: 0,
            fontSize: "8rem",
            fontWeight: 800,
          }}>{precio}</h2>
        </div>
      </div>
      </AbsoluteFill>
    );
  };
  
  export const Producto_Unico = () => {
    const { fps } = useVideoConfig();
  
    // Duración por producto
    const entradaDuracion = 10; // 10 fotogramas
    const duracionVisible = 10 * fps; // 10 segundos
    const salidaDuracion = 10; // 10 fotogramas
    const descanso = 3 * fps; // 3 segundos entre productos
    const duracionPorProducto =
      entradaDuracion + duracionVisible + salidaDuracion + descanso;
  
    return (
      <AbsoluteFill>
        {data.map((producto, index) => {
          const offset = index * duracionPorProducto; // Calcular el offset para este producto
          return (
            <Sequence
              key={index}
              from={offset}
              durationInFrames={duracionPorProducto}
            >
              <Producto
                enlace_imagen={producto.enlace_imagen}
                texto={producto.texto}
                precio={producto.precio}
                relativeFrame={useCurrentFrame() - offset} // Calcular el frame relativo
                fps={fps}
              />
            </Sequence>
          );
        })}
      </AbsoluteFill>
    );
  };