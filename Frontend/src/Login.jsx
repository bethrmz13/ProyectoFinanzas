import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [credenciales, setCredenciales] = useState({
        usuario: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredenciales({ ...credenciales, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Intentando iniciar sesión con:", credenciales); //conexion backed mas adelante
        alert("Login exitoso, redirigiendo el sistema... ");
        navigate('/activos');
    };

    return(
        <div style={{padding:'40px',fontFamily:'sans-serif',maxWidth:'300px',margin:'80px auto',color:'white',backgroundColor:'#1a1a1a',borderRadius:'10px',boxShadow:'0 4px 8px rgba(0,0,0,0.2)'}}>
            <h2 style={{textAlign:'center',marginBottom:'20px'}}>Iniciar Sesión</h2>

            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'15px'}}>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Usuario:</label>
                    <input type="text" name="usuario" value={credenciales.usuario} onChange={handleChange} required style={{padding:'8px',marginTop:'5px',borderRadius:'4px',border:'1px solid #ccc'}}/>

                </div>
                 
                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Contraseña:</label>
                    <input type="password" name="password" value={credenciales.password} onChange={handleChange} required style={{padding:'8px',marginTop:'5px',borderRadius:'4px',border:'1px solid #ccc'}}/>

                </div>

                <button type="submit" style={{padding:'10px',marginTop:'15px',backgroundColor:'#646cff',color:'white',border:'none',borderRadius:'5px',cursor:'pointer',fontWeight:'bold'}}>
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;
