import React from 'react';
import { Layout, Menu, Button, Card, Row, Col, Typography, Steps, Avatar, Carousel } from 'antd';
import { 
  HomeOutlined, 
  TeamOutlined, 
  AlertOutlined, 
  LoginOutlined, 
  AppstoreOutlined, 
  PhoneOutlined,
  HeartOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const Home = () => {
  // Datos de ejemplo
  const features = [
    {
      title: "Alertas Rápidas",
      icon: <AlertOutlined style={{ fontSize: '32px' }} />,
      description: "Recibe notificaciones instantáneas de emergencias cercanas"
    },
    {
      title: "Coordinación en Equipo",
      icon: <TeamOutlined style={{ fontSize: '32px' }} />,
      description: "Organiza equipos de rescate eficientemente"
    },
    {
      title: "Mapa en Tiempo Real",
      icon: <AppstoreOutlined style={{ fontSize: '32px' }} />,
      description: "Visualiza emergencias y recursos en un mapa interactivo"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Rodríguez",
      role: "Rescatista en Medellín",
      content: "Esta plataforma ha revolucionado nuestra capacidad de respuesta en desastres naturales"
    },
    {
      name: "Ana Martínez",
      role: "Voluntaria en Bogotá",
      content: "Gracias a esta app hemos reducido el tiempo de respuesta de 2 horas a 20 minutos"
    }
  ];

  return (
    <Layout className="layout">
      {/* Hero Section */}
      <Content style={{ padding: '0 50px', marginTop: 30 }}>
        <div style={{ background: '#f0f2f5', padding: '80px 20px', textAlign: 'center' }}>
          <Title level={1} style={{ marginBottom: 20 }}>
            Plataforma para Rescatistas Voluntarios
          </Title>
          <Paragraph style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto 30px' }}>
            Conectamos a rescatistas con personas que necesitan ayuda en situaciones de emergencia
          </Paragraph>
          <Button type="primary" size="large" style={{ marginRight: '16px' }}>
            Únete como Voluntario
          </Button>
          <Button size="large">Reportar Emergencia</Button>
        </div>

        {/* Features Section */}
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <Title level={2} style={{ marginBottom: 50 }}>Nuestras Funcionalidades</Title>
          <Row gutter={[24, 48]} justify="center">
            {features.map((feature, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={7}>
                <Card hoverable style={{ height: '100%' }}>
                  <div style={{ marginBottom: 20, color: '#1890ff' }}>
                    {feature.icon}
                  </div>
                  <Title level={4}>{feature.title}</Title>
                  <Text>{feature.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* How it Works */}
        <div style={{ padding: '60px 0', background: '#f9f9f9', textAlign: 'center' }}>
          <Title level={2} style={{ marginBottom: 50 }}>¿Cómo Funciona?</Title>
          <Row justify="center">
            <Col xs={24} md={20} lg={18}>
              <Steps direction={window.innerWidth < 768 ? 'vertical' : 'horizontal'} current={0}>
                <Step title="Registro" description="Crea tu cuenta como rescatista" />
                <Step title="Verificación" description="Completa tu perfil y credenciales" />
                <Step title="Alertas" description="Recibe notificaciones de emergencias" />
                <Step title="Actuación" description="Coordina con tu equipo y actúa" />
              </Steps>
            </Col>
          </Row>
        </div>

        {/* Testimonials */}
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <Title level={2} style={{ marginBottom: 50 }}>Testimonios</Title>
          <Carousel autoplay dotPosition="top" style={{ maxWidth: 800, margin: '0 auto' }}>
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <Card style={{ padding: 20 }}>
                  <Avatar size={64} style={{ marginBottom: 20 }} />
                  <Paragraph style={{ fontSize: '18px', fontStyle: 'italic' }}>
                    "{testimonial.content}"
                  </Paragraph>
                  <Title level={4} style={{ margin: 0 }}>{testimonial.name}</Title>
                  <Text type="secondary">{testimonial.role}</Text>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Call to Action */}
        <div style={{ padding: '80px 20px', background: '#1890ff', textAlign: 'center', color: 'white' }}>
          <Title level={2} style={{ color: 'white' }}>
            ¿Listo para hacer la diferencia?
          </Title>
          <Paragraph style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 30px' }}>
            Únete a nuestra comunidad de más de 5,000 rescatistas voluntarios en todo el país
          </Paragraph>
          <Button size="large" style={{ background: 'white', color: '#1890ff' }}>
            Registrarse Ahora
          </Button>
        </div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center', background: '#001529', color: 'rgba(255,255,255,0.65)' }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: 'white' }}>Rescatistas Voluntarios</Title>
            <Text>Plataforma de coordinación para emergencias</Text>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5} style={{ color: 'white' }}>Contacto</Title>
            <Paragraph>contacto@rescatistas.org</Paragraph>
            <Paragraph>+57 300 123 4567</Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5} style={{ color: 'white' }}>Redes Sociales</Title>
            <Button type="link" style={{ color: 'rgba(255,255,255,0.65)' }}>Facebook</Button>
            <Button type="link" style={{ color: 'rgba(255,255,255,0.65)' }}>Twitter</Button>
            <Button type="link" style={{ color: 'rgba(255,255,255,0.65)' }}>Instagram</Button>
          </Col>
        </Row>
        <div style={{ marginTop: 40 }}>
          © {new Date().getFullYear()} Rescatistas Voluntarios. Todos los derechos reservados.
        </div>
      </Footer>
    </Layout>
  );
};

export default Home;