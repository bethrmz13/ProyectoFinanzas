import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';

function RegistroActivos(){
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
      const respuesta = await fetch('http://localhost:5250/api/activos/registrar',{
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

        <div style={{display:'flex',flexDirection:'column'}}>
          <label>Categoría del Activo:</label>
          <select name="categoria" value={activo.categoria} onChange={handleChange} required style={{padding:'8px',marginTop:'5px',borderRadius:'4px',border:'1px solid #ccc',backgroundColor:'#333',color:'white'}}>
              <option value="">Seleccione una categoría...</option>
              <option value="EQUIPOS INFORMATICOS">Equipos Informáticos</option>
              <option value="VEHICULOS">Vehículos</option>
              <option value="EDIFICIOS">Edificios</option>
              <option value="MUEBLES">Muebles</option>
          </select>
      </div>

        <div style={{display:'flex',flexDirection:'column'}}>
          <label>Producto:</label>
          <input type="text" name="producto" value={activo.producto} onChange={handleChange} required style={{padding:'8px',marginTop:'5px',borderRadius:'4px',border:'1px solid #ccc',backgroundColor:'#333',color:'white'}}/>
        </div>
        
        
        <div style={{display:'flex',flexDirection:'column'}}>
          <label>Precio de Compra ($):</label>
          <input type="number" name="precio" value={activo.precio} min="0" step="0.01" onChange={handleChange} required style={{padding:'8px', marginTop:'5px'}}></input>
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

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/activos" element={<RegistroActivos/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;