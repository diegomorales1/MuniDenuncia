import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import MuniLogo from '../assets/icono.png'

const Login = () => {
    const [formData, setFormData] = useState({ user: '', password: '' });
    const navigate = useNavigate(); // Hook para redirigir

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        /*
        const { user, password } = formData;

        // Validacion con usuario de prueba
        if (user === 'test' && password === '123') {
            toast.success("Inicio de sesión exitoso", {
              duration: 1500,
            })
            // manda a home page
            navigate('/');
        } else {
          toast.error('Credenciales incorrectas',{
            duration: 1500,
          });
          console.error("Error con credenciales");
        }
        */
        toast.success("Inicio de sesión exitoso", {
            duration: 1500,
        })
        navigate('/');
    };

    return (
        <div className="login-container">
            <img src={MuniLogo} alt='logo' className="login-logo" />
            <h1 className="login-title">MuniDenuncia</h1>

            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-subtitle">Inciar sesión</h2>

                <div style={{ position: 'relative' }}>
                    <input 
                        type="user" 
                        name="user" 
                        placeholder="Nombre de usuario" 
                        onChange={handleInputChange} 
                        //required 
                    />
                    <label htmlFor="user">Nombre de usuario</label>
                </div>

                <div style={{ position: 'relative' }}>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Contraseña" 
                        onChange={handleInputChange} 
                        //required 
                    />
                    <label htmlFor="password">Contraseña</label>
                </div>

                <button type="submit" className="login-button">Ingresar</button>
            </form>

            <p className="register-link">
                <Link to="/register" className="register-text">Regístrate aquí</Link>
            </p>
        </div>
    );
};

export default Login;