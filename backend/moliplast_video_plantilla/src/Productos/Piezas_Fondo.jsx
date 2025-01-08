import imageHelper from '../utils/imageHelper'

const pieza_izquierda = {
  //backgroundColor: "red",
  width:"50%",
  height:"100%",
  display:"flex",
  justifyContent: "start"
};


const pieza_derecha = {
  //backgroundColor: "green",
  width:"50%",
  height:"100%",
  display:"flex",
  justifyContent: "end"
};

export const Pieza_Izquierda = () => {
  return (
    <div style={{...pieza_izquierda}}>
      <img 
      style={{height:"50%"}}
      src={imageHelper.PiezaIzquierda} alt="Nombre" />
    </div>
  );
};



export const Pieza_Derecha = () => {
  return (
    <div style={{...pieza_derecha}}>
      <img src={imageHelper.PiezaDerecha} alt="Nombre" />
    </div>
  );
};
  