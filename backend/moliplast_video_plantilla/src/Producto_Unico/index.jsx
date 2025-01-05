import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { Producto } from './Producto'; 

export const Producto_Unico = ({ data = [] }) => {
    const { fps } = useVideoConfig();


    console.log('Datos recibidos en Producto_Unico:', data);

    // Duración por producto
    const entradaDuracion = 10;
    const duracionVisible = 10 * fps;
    const salidaDuracion = 10;
    const descanso = 3 * fps;
    const duracionPorProducto = entradaDuracion + duracionVisible + salidaDuracion + descanso;


    

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
        </AbsoluteFill>
    );
};
