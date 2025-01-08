import { Composition } from 'remotion';
import { Productos } from './Productos'; // Ajusta esta importación si está en otra ubicación
import './assets/styles/estilos_generales.css'

export const RemotionRoot = () => {

    const fps = 30
    const duracionProductoEnFrames = 13.19 * fps
    const duracionTotalVideo = Math.floor(duracionProductoEnFrames * 4)


    return (
        
            <Composition
                id="Productos" // Este ID debe coincidir con el comando de renderizado
                component={Productos}
                durationInFrames={duracionTotalVideo}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
              }} // Datos predeterminados
            />
        
    );
};
