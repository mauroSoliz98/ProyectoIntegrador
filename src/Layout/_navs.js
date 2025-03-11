const nav = [
    {
        key: '1',
        label: 'Inicio',
        to: '/',
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
        label: 'Mapa',
        to: '/mapa',
    },
    {
        key: '5',
        label: 'Oportunidades',
        to: '/oportunidades',
    },
    {
        key: '6',
        label: 'Capacitaciones',
        to: '/capacitaciones',
    },
    {
        key: '7',
        label: 'Sobre Nosotros',
        to: '/nosotros',
    }
]
export default nav;