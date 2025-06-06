import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate, Link } from 'react-router';
import serviceRegister from '../../Services/serviceRegister';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthContext'; // Importar el contexto

const { Title, Text } = Typography;

export const Login = () => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    const { authLogin } = useAuth(); // Obtener función login del contexto

    const handleSubmit = async () => {
        if (!login.username || !login.password) {
            toast.error("⚠ Todos los campos son obligatorios", {
                theme: "light",
                position: "bottom-right",
            });
            return;
        }

        if (login.password.length < 6) {
            toast.error("⚠ La contraseña debe contener al menos 6 caracteres", {
                theme: "light",
            });
            return;
        }

        try {
            const data = {
                username: login.username,
                password: login.password
            };
            const response = await serviceRegister.enter(data);
            console.log("Respuesta del servidor:", response);
            // Guardar datos del usuario en el contexto
            authLogin(response);
            
            toast.success("Bienvenido, has iniciado sesión exitosamente", {
                theme: "light",
                position: "bottom-right",
            });
            navigate('/home');
        } catch (error) {
            const errorMsg = error.response?.data?.detail || "Error al iniciar sesión";
            toast.error(`⚠ ${errorMsg}`, {
                theme: "light",
                position: "bottom-right",
            });
        }
    };

    return (
        <div className='w-full h-full flex flex-col justify-center items-center bg-white p-5 rounded-lg shadow-lg'>
            <div className='self-start mb-10'>
                <Title>Sign in</Title>
                <Text type="secondary">
                    Bienvenido a la pagina principal de SOS-friends
                    <br />
                    Si ya tienes cuenta inicia sesion
                </Text>
            </div>
            <Form className='self-start w-full flex flex-col gap-4' onFinish={handleSubmit}>
                <div>
                    <Text type="secondary">Username</Text>
                    <Input 
                        value={login.username} 
                        placeholder='correo electronico' 
                        size="large" 
                        onChange={(e) => setLogin({...login, username: e.target.value})}
                    />
                </div>
                <div>
                    <Text type="secondary">Password</Text>
                    <Input.Password 
                        value={login.password} 
                        placeholder='contraseña' 
                        size="large" 
                        onChange={(e) => setLogin({...login, password: e.target.value})}
                    />
                </div>
                <Button type="primary" htmlType="submit" size='large' block>
                    Iniciar sesion
                </Button>
            </Form>
            <div className='flex flex-col gap-2 mt-10'>
                <Text type="secondary">
                    ¿No tienes cuenta? {" "}
                    <Link to="/register" className='text-blue-500 hover:text-blue-700'>
                        Registrate
                    </Link>
                </Text>
            </div>
        </div>
    );
}