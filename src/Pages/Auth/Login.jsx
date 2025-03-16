import React, { useState } from 'react'
import { Form, Input, Button, Typography, Card } from 'antd'
import { useNavigate } from 'react-router'
import fondo from '../../assets/backImage.jpg'
import FloatingLabelInput from '../../Components/FlotinLabelInput'
const { Item } = Form;
const { Title } = Typography;
export const Login = () => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        try {
            //e.preventDefault()
            if(login.username === 'admin' && login.password === 'admin'){
                navigate('/home')
                console.log('Login success');
                
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-screen w-full flex flex-col md:flex-row'>
            {/* Imagen de fondo */}
            <div 
                className='absolute inset-0 bg-cover bg-center md:relative md:h-screen md:w-1/2' 
                style={{ backgroundImage: `url(${fondo})` }}
            ></div>
            
            {/* Sección de Login */}
            <div className='relative z-10 flex flex-col justify-center items-center w-full h-full md:h-screen md:w-1/2 
                            md:bg-gradient-to-r md:from-neutral-50 md:from-30% md:to-slate-500'>
                <div className="w-full max-w-xs sm:max-w-sm bg-opacity-75 bg-white/30 backdrop-blur-sm rounded-lg shadow-lg py-12 px-6 sm:px-8">
                    <div className='self-start mb-10'>
                        <Title>Log In</Title>
                    </div>
                    <Form className='flex flex-col gap-4' onFinish={handleSubmit}>
                        <FloatingLabelInput 
                            label="username" 
                            value={login.username || ''} 
                            onChange={e => setLogin({...login, username: e.target.value})} 
                        />
                        <FloatingLabelInput 
                            label="password" 
                            type='password' 
                            value={login.password || ''}
                            onChange={e => setLogin({...login, password: e.target.value})} 
                        />
                        <Button type="primary" htmlType="submit" block size="large">
                            Log In
                        </Button>
                    </Form>
                </div>
            </div>
        </div>

    )
}
