import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../Context/AuthContext';
import serviceChat from '../../Services/serviceChat';
import { Button, Input, List, Avatar, Spin, Card, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const websocketRef = useRef(null);

  // Obtener profile_id del usuario
  const profileId = user?.user_id;
  
  // Cargar mensajes iniciales
  useEffect(() => {
    if (!profileId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const messagesData = await serviceChat.getAll(profileId);
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

  // Configurar WebSocket para actualizaciones en tiempo real
  useEffect(() => {
    if (!profileId) return;

    // Crear conexión WebSocket con el backend
    const websocketUrl = `ws://localhost:8000/api/chat/ws`; // Ajusta según tu entorno
    
    websocketRef.current = new WebSocket(websocketUrl);

    websocketRef.current.onopen = () => {
      console.log('Conexión WebSocket establecida');
    };

    websocketRef.current.onmessage = (event) => {
      try {
        const newMessage = JSON.parse(event.data);
        setMessages(prev => [...prev, newMessage]);
      } catch (error) {
        console.error('Error al parsear mensaje WebSocket:', error);
      }
    };

    websocketRef.current.onerror = (error) => {
      console.error('Error en WebSocket:', error);
      message.error('Error en conexión de tiempo real');
    };

    websocketRef.current.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, [profileId]);

  // Scroll automático al final de los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !profileId) return;

    try {
      setSending(true);
      const messageData = {
        profile_id: profileId,
        content: newMessage
      };

      // Enviar mensaje a través del servicio HTTP
      await serviceChat.create(messageData);
      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      message.error('Error al enviar mensaje');
    } finally {
      setSending(false);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Por favor inicia sesión para usar el chat</p>
        <Button type="primary" onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}>
          Iniciar sesión
        </Button>
      </div>
    );
  }

  return (
    <Card 
      title={`Chat - ${user.email}`}
      variant={false}
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
            disabled={sending}
            style={{ flex: 1, marginRight: '10px' }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            loading={sending}
            disabled={!newMessage.trim()}
          >
            Enviar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Chat;