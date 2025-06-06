import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Row, 
  Col, 
  Typography, 
  Space, 
  Statistic, 
  Badge,
  Timeline,
  Alert,
  Input
} from 'antd';
import {
  PhoneOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  HeartOutlined,
  AlertOutlined,
  UserOutlined,
  EnvironmentOutlined,
  SafetyOutlined,
  FireOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function RescatistasHomepage() {
  const handleEmergencyCall = () => {
    console.log('Llamada de emergencia activada');
  };

  const handleEmergencyReport = () => {
    console.log('Reporte de emergencia enviado');
  };

  const handleVolunteerRegister = () => {
    console.log('Registro de voluntario enviado');
  };

  const stats = [
    { title: 'Rescates Realizados', value: 2847, icon: <CheckCircleOutlined /> },
    { title: 'Voluntarios Activos', value: 156, icon: <TeamOutlined /> },
    { title: 'Tiempo Promedio Respuesta', value: '12 min', icon: <ClockCircleOutlined /> },
    { title: 'Zonas Cubiertas', value: 8, icon: <EnvironmentOutlined /> }
  ];

  const recentRescues = [
    { 
      time: 'Hace 2 horas', 
      location: 'Zona Sur - El Alto', 
      type: 'Rescate en montaña',
      status: 'Completado',
      volunteers: 4
    },
    { 
      time: 'Hace 5 horas', 
      location: 'Centro - Plaza Murillo', 
      type: 'Emergencia médica',
      status: 'Completado',
      volunteers: 2
    },
    { 
      time: 'Hace 1 día', 
      location: 'Zona Norte - Villa Fátima', 
      type: 'Búsqueda y rescate',
      status: 'Completado',
      volunteers: 6
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header de Emergencia */}
      <Alert
        message="🚨 LÍNEA DE EMERGENCIA 24/7: 911 - 165 - 118"
        type="error"
        showIcon
        style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}
      />

      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
        padding: '80px 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={1} style={{ color: 'white', fontSize: '3.5rem', margin: 0 }}>
            Rescatistas Voluntarios La Paz
          </Title>
          <Paragraph style={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '1.3rem', 
            margin: '24px 0 40px',
            maxWidth: '600px',
            margin: '24px auto 40px'
          }}>
            Unidos salvamos vidas. Respuesta rápida y profesional en situaciones de emergencia
            en toda la región de La Paz.
          </Paragraph>
          
          <Space size="large">
            <Button 
              type="primary" 
              danger 
              size="large"
              icon={<PhoneOutlined />}
              onClick={handleEmergencyCall}
              style={{ 
                height: '60px', 
                fontSize: '18px',
                background: '#ff4d4f',
                border: 'none',
                boxShadow: '0 4px 15px rgba(255,77,79,0.4)'
              }}
            >
              EMERGENCIA AHORA
            </Button>
            <Button 
              type="default" 
              size="large"
              icon={<HeartOutlined />}
              style={{ 
                height: '60px', 
                fontSize: '18px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              SER VOLUNTARIO
            </Button>
          </Space>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        
        {/* Estadísticas */}
        <Row gutter={[24, 24]} style={{ marginBottom: '60px' }}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card style={{ textAlign: 'center', height: '100%' }}>
                <div style={{ fontSize: '32px', color: '#1890ff', marginBottom: '12px' }}>
                  {stat.icon}
                </div>
                <Statistic 
                  title={stat.title} 
                  value={stat.value}
                  valueStyle={{ color: '#1890ff', fontSize: '24px' }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[32, 32]}>
          {/* Reportar Emergencia */}
          <Col xs={24} lg={12}>
            <Card 
              title={
                <Space>
                  <AlertOutlined style={{ color: '#ff4d4f' }} />
                  <span>Reportar Emergencia</span>
                </Space>
              }
              style={{ height: '100%' }}
            >
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Ubicación de la Emergencia *
                  </label>
                  <Input 
                    placeholder="Ej: Calle Sagárnaga #123, Centro"
                    prefix={<EnvironmentOutlined />}
                    size="large"
                  />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Tipo de Emergencia *
                  </label>
                  <Input 
                    placeholder="Ej: Persona atrapada, accidente vehicular"
                    prefix={<FireOutlined />}
                    size="large"
                  />
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Descripción Adicional
                  </label>
                  <Input.TextArea 
                    rows={3}
                    placeholder="Detalles adicionales que puedan ayudar..."
                  />
                </div>
                
                <Button 
                  type="primary" 
                  danger 
                  onClick={handleEmergencyReport}
                  size="large"
                  block
                  icon={<AlertOutlined />}
                >
                  ENVIAR ALERTA DE EMERGENCIA
                </Button>
              </div>
            </Card>
          </Col>

          {/* Registro de Voluntarios */}
          <Col xs={24} lg={12}>
            <Card 
              title={
                <Space>
                  <HeartOutlined style={{ color: '#52c41a' }} />
                  <span>Únete como Voluntario</span>
                </Space>
              }
              style={{ height: '100%' }}
            >
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Nombre Completo *
                  </label>
                  <Input 
                    placeholder="Tu nombre completo"
                    prefix={<UserOutlined />}
                    size="large"
                  />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Teléfono *
                  </label>
                  <Input 
                    placeholder="Ej: 70123456"
                    prefix={<PhoneOutlined />}
                    size="large"
                  />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Zona de Residencia *
                  </label>
                  <Input 
                    placeholder="Ej: Zona Sur, El Alto"
                    prefix={<EnvironmentOutlined />}
                    size="large"
                  />
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Experiencia/Habilidades
                  </label>
                  <Input.TextArea 
                    rows={2}
                    placeholder="Primeros auxilios, montañismo, etc."
                  />
                </div>
                
                <Button 
                  type="primary" 
                  onClick={handleVolunteerRegister}
                  size="large"
                  block
                  icon={<HeartOutlined />}
                  style={{ background: '#52c41a', borderColor: '#52c41a' }}
                >
                  REGISTRARME COMO VOLUNTARIO
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Rescates Recientes */}
        <Card 
          title={
            <Space>
              <ClockCircleOutlined style={{ color: '#1890ff' }} />
              <span>Actividad Reciente</span>
            </Space>
          }
          style={{ marginTop: '40px' }}
        >
          <Timeline>
            {recentRescues.map((rescue, index) => (
              <Timeline.Item 
                key={index}
                dot={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <Text strong>{rescue.type}</Text>
                    <br />
                    <Text type="secondary">
                      <EnvironmentOutlined /> {rescue.location}
                    </Text>
                    <br />
                    <Badge 
                      status="success" 
                      text={rescue.status}
                      style={{ marginRight: '12px' }}
                    />
                    <Text type="secondary">
                      <TeamOutlined /> {rescue.volunteers} voluntarios
                    </Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {rescue.time}
                  </Text>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>

        {/* Información de Contacto */}
        <Card 
          title="Información de Contacto"
          style={{ marginTop: '40px', textAlign: 'center' }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <div>
                <PhoneOutlined style={{ fontSize: '24px', color: '#1890ff', marginBottom: '8px' }} />
                <br />
                <Text strong>Emergencias</Text>
                <br />
                <Text>911 - 165 - 118</Text>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div>
                <EnvironmentOutlined style={{ fontSize: '24px', color: '#1890ff', marginBottom: '8px' }} />
                <br />
                <Text strong>Oficina Central</Text>
                <br />
                <Text>Plaza San Francisco #456</Text>
                <br />
                <Text>La Paz, Bolivia</Text>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div>
                <ClockCircleOutlined style={{ fontSize: '24px', color: '#1890ff', marginBottom: '8px' }} />
                <br />
                <Text strong>Disponibilidad</Text>
                <br />
                <Text>24 horas, 7 días</Text>
                <br />
                <Text>Todo el año</Text>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}