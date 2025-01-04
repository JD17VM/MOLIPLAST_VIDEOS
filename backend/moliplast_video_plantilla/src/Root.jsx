import { Composition } from 'remotion';
import { Producto_Unico } from './Producto_Unico'; // Ajusta esta importación si está en otra ubicación

export const RemotionRoot = () => {
    return (
        
            <Composition
                id="ProductoUnico" // Este ID debe coincidir con el comando de renderizado
                component={Producto_Unico}
                durationInFrames={2000}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
              }} // Datos predeterminados
            />
        
    );
};
