import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { Producto } from './Producto'; 
import imageHelper from '../utils/imageHelper';

export const Producto_Unico = ({ data = [] }) => {
    const { fps } = useVideoConfig();


    console.log('Datos recibidos en Producto_Unico:', data);

    // Duración por producto
    const entradaDuracion = 10;
    const duracionVisible = 10 * fps;
    const salidaDuracion = 10;
    const descanso = 3 * fps;
    const duracionPorProducto = entradaDuracion + duracionVisible + salidaDuracion + descanso;

    const frame = useCurrentFrame();
    const createOscillation = (amplitude, speed) =>
    amplitude * Math.sin((2 * Math.PI * frame) / (fps * speed));
    
    const logoOscillationY = createOscillation(15, 0.6); // Oscilación vertical para el precio
    return (
        <AbsoluteFill style={{ backgroundColor: 'white' }}>
            {data.map((producto, index) => {
                const offset = index * duracionPorProducto;
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
                            fps={fps}
                            index={index}
                        />
                    </Sequence>
                );
            })}
            <div style={{
                position: "absolute",
                top: "30px",
                //backgroundColor: "red",
                width: "100%",
                height: "150px",
                bottom: 0,  // Esto lo posiciona en la parte inferior
                display: "flex",
                justifyContent: "center",
                transform: `translateY(${logoOscillationY}px)`,
                }}>
                <img style={{
                    height: "100%",
                }}
                src={imageHelper.Logo_Moliplast} alt="" />
            </div>
        </AbsoluteFill>
    );
};
