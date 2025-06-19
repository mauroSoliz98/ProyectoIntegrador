import { NavLink } from "react-router";

const nav = [
    {
        key: '1',
        label:  <NavLink to="/home/home">Inicio</NavLink>,
    },
    {
        key: 'sub2',
        label: 'Registro',
        children:[
            {
                key: '2',
                label: 'Registro de Voluntarios',
                to: '/voluntarios',
            },
            {
                key: '3',
                label: 'Registro de Organizaciones',
                to: '/organizaciones',
            },
        ]
    },
    {
        key: '4',
        label:  <NavLink to="/home/map">Mapa</NavLink>,
    },
    {
        key: '5',
        label:  <NavLink to="/home/chat">Chat</NavLink>,
    },
    {
        key: '6',
        label: <NavLink to="/home/capacitaciones">Capacitaciones</NavLink>,
    },
    {
        key: '7',
        label: <NavLink to="/home/aboutus">Sobre Nosotros</NavLink>,
    }
]
export default nav;