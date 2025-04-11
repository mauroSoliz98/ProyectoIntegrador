import React from 'react'
import fondo from '../../assets/images/Amistad.jpg'
import { Outlet } from 'react-router'
export function AuthLayout() {
    return (
        <div className='h-screen w-full flex flex-col md:flex-row'>
            {/* Secccion del fondo */}
            <div className='absolute inset-0 bg-cover bg-center md:relative md:h-screen md:w-full'
                style={{ backgroundImage: `url(${fondo})` }} />
            {/* Sección de Login */}
            <div className='relative z-10 flex flex-col justify-center items-center w-full h-full md:h-screen md:w-1/2 
                bg-none md:bg-gradient-to-l md:from-gray-50 md:to-gray-100'>
                <Outlet />
            </div>
        </div>
    )
}