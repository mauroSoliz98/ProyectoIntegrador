import React, { useState } from 'react'
import { Form, Input, Button, Typography, Checkbox } from 'antd'
import { useNavigate,Link } from 'react-router'
import serviceRegister from '../../Services/serviceRegister';
import {toast} from 'react-toastify';
const { Item } = Form;
const { Title, Text } = Typography;
export const Register = () => {
    const [register, setRegister] = useState({
        name: '',
        username: '',
        email:'',
        country: '',
        password: '',
        passwordConfirm: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async() => {
        setIsSubmitting(true);
        // Validate the form data
        if (!register.name || !register.username || !register.country || !register.password || !register.passwordConfirm) {
            toast.error("⚠ Todos los campos son obligatorios", { theme:"light" });
            setIsSubmitting(false);
            return;
        }
        if (register.password !== register.passwordConfirm) {
            toast.error("⚠ Las contraseñas no coinsiden", { theme: "light" });
            setIsSubmitting(false);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(register.email)) {
            toast.error("⚠ Ingrese un correo válido", { theme: "light" });
            setIsSubmitting(false);
            return;
        }
        if (register.password.length < 6) {
            toast.error("⚠ La contraseña debe contener al menos 6 caracteres", { theme: "light" });
            setIsSubmitting(false);
            return;
        }
            // Create the user object
           const user_register = {
                name: register.name,
                username: register.username,
                email: register.email,
                country: register.country,
                password: register.password,
                passwordConfirm: register.passwordConfirm
            }
            console.log(user_register);
            // Call the API to register the user
            const response = await serviceRegister.create(user_register);
            console.log(response);
            // If successful, navigate to the login page
            toast.success("🎉 Usuario registrado exitosamente", { theme: "light" });
            navigate('/login')
    }

    const handleChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value });
    };

    return (

        <div className='w-full h-full flex flex-col justify-center items-center bg-white p-5 rounded-lg shadow-lg'>
            <div className='self-start mb-10'>
                <Title>Sign up</Title>
                <Text type="secondary">
                    Bienvenido a la pagina principal de SOS-friends.
                    <br />
                    Registrate para poder iniciar sesion.
                </Text>
            </div>
            <Form className='self-start w-full flex flex-col gap-4' onFinish={handleSubmit}>
                <div>
                    <Text type="secondary">Nombre</Text>
                    <Input name="name" value={register.name} placeholder='Nombre' size="large" onChange={handleChange} />
                </div>
                <div>
                    <Text type="secondary">Username</Text>
                    <Input name='username' value={register.username} placeholder='Nombre de usuario' size="large" onChange={handleChange} />
                </div>
                <div>
                    <Text type="secondary">E-mail</Text>
                    <Input name='email' value={register.email} placeholder='ejemplo@mail.com' size="large" onChange={handleChange} />
                </div>
                <div>
                    <Text type="secondary">Pais</Text>
                    <Input name='country' value={register.country} placeholder='Ingrese pais de origen' size="large" onChange={handleChange}/>
                </div>
                <div>
                    <Text type="secondary">Contraseña</Text>
                    <Input.Password name='password' value={register.password} placeholder='Contraseña' size="large" onChange={handleChange} />
                </div>
                <div>
                    <Text type="secondary">Confirme contraseña</Text>
                    <Input.Password name='passwordConfirm' value={register.passwordConfirm} placeholder='Confirme contraseña' size="large" onChange={handleChange}/>
                </div>
                <Checkbox onChange={e => e.target.checked}>Estoy deacuerdo con los terminos y condiciones</Checkbox>
                <Button type="primary" htmlType="submit" size='large' block>
                    {isSubmitting ? 'Registrando...' : 'Registrarse'}
                </Button>
            </Form>
        </div>

    )
}
