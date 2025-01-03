import { Composition } from "remotion";
import { Producto_Unico } from "./Producto_Unico";
import './assets/styles/estilos_generales.css'

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ProductoUnico"
        component={Producto_Unico}
        durationInFrames={2000}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
