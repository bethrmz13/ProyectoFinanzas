import { useState } from "react";

const categoriasActivos={
  "Equipo de Computo (3 años)": ["Laptop","Computadore de escritorio","Impresora","Servidor"],
  "Muebles y Enseres (10 años)": ["Escritorio","Silla Ergonómica","Archivador","Mesa de reuniones"],
  "Vehiculos (5 años)": ["Automovil","Camioneta","Motocicleta"],
  "Bienes Inmuebles (20 años)": ["Edificios","Oficina","Bodega","Local Comercial"]
};

function App(){
  const [activo, setActivo] = useState({
    tipo: '',
    detalle: '',
    precio: '',
    fechaIngreso: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    if (name=='tipo'){
      setActivo({...activo, tipo: value, detalle: ''});
    }else{
      setActivo({...activo, [name]: value});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:5249/api/activos/registrar',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(activo)
      });

      if (respuesta.ok){
        alert("El activo se guardó en la base de datos");
        setActivo({ tipo: '',detalle: '',precio: '', fechaIngreso: ''});
      }else{
        alert("Hubo un error al guardar el activo.");
      }
    }catch (error){
      console.error("Error de conexión:", error);
    }
  };

  const detallesDisponibles = activo.tipo ? categoriasActivos[activo.tipo]:[];

  return (
    <div style={{padding:'40 px',fontFamily:'sans-serif',maxWidth:'400px',margin:'0 auto',color:'white'}}>
      <h2>Registro de Activos</h2>

      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'15px'}}>

        {/*combobox - tipo de activo*/}
        <div style={{display:'flex',flexDirection:'column'}}>
          <label>Categoría del Activo:</label>
          <select name="tipo" value={activo.tipo} onChange={handleChange} required style={{padding:'8px',marginTop:'5px'}}>
            <option value="">-- Selecciona una categoría --</option>
            {Object.keys(categoriasActivos).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/*combobox - detalle*/}
        <div style={{display:'flex',flexDirection: 'column'}}>
          <label>Equipo Especifico:</label>
          <select name="detalle" value={activo.detalle} onChange={handleChange} required disabled={!activo.tipo} style={{padding:'8px', marginTop:'5px'}}>
            <option value="">-- Selecciona un equipo --</option>
            {detallesDisponibles.map((det) => (
              <option key={det} value={det}>{det}</option>
            ))}
          </select>      
        </div>
        
        <div style={{display:'flex',flexDirection:'column'}}>
          <label>Precio de Compra ($):</label>
          <input type="number" name="precio" value={activo.precio} step="0.01" onChange={handleChange} required style={{padding:'8px', marginTop:'5px'}}></input>
        </div>
        
        <div style={{display:'flex',flexDirection:'column'}}>
          <label>Fecha de Compra / Adquisición</label>
          <input type="date" name="fechaIngreso" value={activo.fechaIngreso} onChange={handleChange} required style={{padding:'8px', marginTop:'5px'}}></input>
        </div>
        
        <button type="submit" style={{padding:'10px 15px', marginTop:'10px',backgroundColor:'#646cff',color:'white',border:'none',borderRadius:'5px',cursor:'pointer',fontWeight:'bold'}}>
          Registrar Activo
        </button>
      </form>
    </div>
    
  )
}
export default App;