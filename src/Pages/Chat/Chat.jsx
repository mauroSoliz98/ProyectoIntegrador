// Chat.jsx con debugging mejorado
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../Context/AuthContext';
import serviceChat from '../../Services/serviceChat';
import { Button, Input, List, Spin, Card, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [wsStatus, setWsStatus] = useState('Desconectado'); // Estado del WebSocket
  const messagesEndRef = useRef(null);
  const websocketRef = useRef(null);

  const profileId = user?.user_id;
  
  // Cargar mensajes iniciales
  useEffect(() => {
    if (!profileId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        console.log('Cargando mensajes para profileId:', profileId);
        const messagesData = await serviceChat.getAll(profileId);
        console.log('Mensajes cargados:', messagesData);
        setMessages(messagesData);
      } catch (error) {
        console.error('Error al cargar mensajes:', error);
        message.error('Error al cargar mensajes');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [profileId]);

  // Configurar WebSocket
  useEffect(() => {
    if (!profileId) return;

    console.log('Iniciando conexión WebSocket para profileId:', profileId);
    
    try {
      // Crear conexión WebSocket
      websocketRef.current = serviceChat.createChatSocket(profileId);
      
      // Manejar eventos del WebSocket
      websocketRef.current.onopen = () => {
        console.log('✅ Conexión WebSocket establecida exitosamente');
        setWsStatus('Conectado');
      };

      websocketRef.current.onmessage = (event) => {
        console.log('📨 Mensaje recibido via WebSocket:', event.data);
        try {
          const messageData = JSON.parse(event.data);
          console.log('Datos del mensaje parseados:', messageData);
          
          if (messageData && messageData.content && messageData.profile_id) {
            setMessages(prev => {
              console.log('Agregando mensaje a la lista:', messageData);
              return [...prev, messageData];
            });
          } else {
            console.warn('Mensaje recibido con formato inválido:', messageData);
          }
        } catch (error) {
          console.error('Error al parsear mensaje WebSocket:', error);
        }
      };

      websocketRef.current.onerror = (error) => {
        console.error('❌ Error en WebSocket:', error);
        setWsStatus('Error');
        message.error('Error en conexión de tiempo real');
      };

      websocketRef.current.onclose = (event) => {
        console.log('🔌 WebSocket cerrado:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean
        });
        setWsStatus('Desconectado');
        
        if (!event.wasClean) {
          console.error('Conexión WebSocket interrumpida inesperadamente');
        }
      };

    } catch (error) {
      console.error('Error al crear WebSocket:', error);
      setWsStatus('Error de conexión');
    }

    // Limpieza
    return () => {
      if (websocketRef.current) {
        console.log('🧹 Cerrando conexión WebSocket');
        websocketRef.current.close(1000, "Componente desmontado");
      }
    };
  }, [profileId]);

  // Scroll automático
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!newMessage.trim() || !profileId) {
      console.warn('Mensaje vacío o profileId no disponible');
      return;
    }

    console.log('📤 Enviando mensaje:', newMessage);

    try {
      setSending(true);
      
      const messageToSend = {
        profile_id: profileId,
        content: newMessage
      };
      
      console.log('Datos a enviar:', messageToSend);
      console.log('Estado WebSocket:', websocketRef.current?.readyState);
      
      if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
        const jsonMessage = JSON.stringify(messageToSend);
        console.log('Enviando JSON:', jsonMessage);
        
        websocketRef.current.send(jsonMessage);
        setNewMessage('');
        console.log('✅ Mensaje enviado exitosamente');
      } else {
        console.error('❌ WebSocket no disponible. Estado:', websocketRef.current?.readyState);
        message.error('No hay conexión WebSocket activa');
      }
    } catch (error) {
      console.error('❌ Error al enviar mensaje:', error);
      message.error('Error al enviar mensaje');
    } finally {
      setSending(false);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Por favor inicia sesión para usar el chat</p>
      </div>
    );
  }

  return (
    <Card 
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Chat - {user.email}</span>
          <span style={{ 
            fontSize: '12px', 
            color: wsStatus === 'Conectado' ? '#52c41a' : '#ff4d4f',
            fontWeight: 'normal'
          }}>
            {wsStatus}
          </span>
        </div>
      }
      styles={{
        header: {
          background: '#1890ff',
          color: 'white'
        }
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '70vh' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Spin size="large" />
          </div>
        ) : (
          <List
            style={{ flex: 1, overflowY: 'auto' }}
            dataSource={messages}
            renderItem={(msg) => (
              <List.Item
                style={{
                  justifyContent: msg.profile_id === profileId ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    backgroundColor: msg.profile_id === profileId ? '#e6f7ff' : '#f5f5f5',
                    padding: '10px 15px',
                    borderRadius: '10px',
                    maxWidth: '70%'
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>
                    {msg.profile_id === profileId ? 
                      "Tú" : user.user_metadata?.full_name || user.email}
                  </div>
                  <div>{msg.content}</div>
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
                    {new Date(msg.created_at || msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
        <div ref={messagesEndRef} />
        
        <div style={{ marginTop: '20px', display: 'flex' }}>
          <TextArea
            rows={2}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Escribe un mensaje..."
            disabled={sending || wsStatus !== 'Conectado'}
            style={{ flex: 1, marginRight: '10px' }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            loading={sending}
            disabled={!newMessage.trim() || wsStatus !== 'Conectado'}
          >
            Enviar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Chat;