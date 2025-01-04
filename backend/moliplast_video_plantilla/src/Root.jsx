import { Composition } from 'remotion';
import { Producto_Unico } from './Producto_Unico'; // Ajusta esta importación si está en otra ubicación
import './assets/styles/estilos_generales.css'

export const RemotionRoot = () => {

    const fps = 30
    const duracionProductoEnFrames = 13.19 * fps
    const duracionTotalVideo = Math.floor(duracionProductoEnFrames * 4)


    return (
        
            <Composition
                id="ProductoUnico" // Este ID debe coincidir con el comando de renderizado
                component={Producto_Unico}
                durationInFrames={duracionTotalVideo}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
              }} // Datos predeterminados
            />
        
    );
};
