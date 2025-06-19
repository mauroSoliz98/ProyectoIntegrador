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

    // Crear conexión WebSocket usando el servicio
    websocketRef.current = serviceChat.createChatSocket(profileId);
    
    // Manejar eventos del WebSocket
    websocketRef.current.onopen = () => {
      console.log('Conexión WebSocket establecida');
    };

    websocketRef.current.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        
        // Verificar si es un mensaje válido
        if (messageData && messageData.content && messageData.profile_id) {
          setMessages(prev => [...prev, messageData]);
        }
      } catch (error) {
        console.error('Error al parsear mensaje WebSocket:', error);
      }
    };

    websocketRef.current.onerror = (error) => {
      console.error('Error en WebSocket:', error);
      message.error('Error en conexión de tiempo real');
    };

    websocketRef.current.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Conexión cerrada limpiamente: ${event.reason}`);
      } else {
        console.error('Conexión interrumpida');
      }
    };

    // Limpieza al desmontar el componente
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close(1000, "Componente desmontado");
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

// Solo la parte del handleSend que necesita cambiar
const handleSend = () => {
  if (!newMessage.trim() || !profileId) return;

  try {
    setSending(true);
    
    // Construir el mensaje en el formato esperado por el backend
    // Tu backend espera un objeto con profile_id y content directamente
    const messageToSend = {
      profile_id: profileId,
      content: newMessage
    };
    
    // Enviar mensaje a través del WebSocket
    if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
      // Tu backend usa receive_json(), así que enviamos JSON
      websocketRef.current.send(JSON.stringify(messageToSend));
      setNewMessage('');
    } else {
      message.error('No hay conexión WebSocket activa');
    }
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
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
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