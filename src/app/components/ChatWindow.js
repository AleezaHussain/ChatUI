"use client";

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ChatWindow = ({ toUser }) => {
  const fromUser = 5; 
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!toUser?.id) return;

    const fetchChats = async () => {
      try {
        const res = await fetch(`http://18.143.79.95/api/chatSystem/chatByUserId/${toUser.id}`);
        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };
    fetchChats();
  }, [toUser]);

  const filteredChats = search
    ? chats.filter(c => c.message.toLowerCase().includes(search.toLowerCase()))
    : chats;

  const handleSend = async () => {
    if (!message.trim() || !toUser?.id) return;

    const payload = {
      fromUser,
      toUser: toUser.id,
      message
    };

    try {
      await fetch("/api/chatSystem/chat/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      setMessage(""); // clear input

      // refresh messages
      const res = await fetch(`http://18.143.79.95/api/chatSystem/chatByUserId/${toUser.id}`);
      const data = await res.json();
      setChats(data);
    } catch (err) {
      console.error("Failed to send:", err);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid #eee',
          bgcolor: '#fff',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={toUser?.profileImage}
            alt={toUser?.username}
            sx={{ width: 48, height: 48, mr: 2 }}
          />
          <Box>
            <Typography fontWeight="bold">{toUser?.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              {toUser?.position}
            </Typography>
          </Box>
        </Box>

        <Box>
          <IconButton><SearchIcon /></IconButton>
          <IconButton><CallIcon /></IconButton>
          <IconButton><VideocamIcon /></IconButton>
          <IconButton><MoreVertIcon /></IconButton>
        </Box>
      </Box>

      {/* Chat Body */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: '#f7f8fa' }}>
        {filteredChats.map(chat => {
          const isSender = chat.fromUser === fromUser;
          const avatarSrc = isSender ? null : toUser?.profileImage;

          return (
            <Box
              key={chat.id}
              sx={{
                display: 'flex',
                justifyContent: isSender ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
                mb: 1,
              }}
            >
              {!isSender && (
                <Avatar
                  src={avatarSrc}
                  alt={toUser?.username}
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
              )}

              <Box
                sx={{
                  maxWidth: '65%',
                  p: 1.2,
                  bgcolor: isSender ? '#5D2EDE' : '#fff',
                  color: isSender ? '#fff' : '#000',
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="body2">{chat.message}</Typography>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', textAlign: isSender ? 'right' : 'left', mt: 0.5 }}
                  color="text.secondary"
                >
                  {formatTime(chat.timestamp)}
                </Typography>
              </Box>

              {isSender && (
                <Avatar
                  src="https://picsum.photos/seed/user5/200/200" // Replace with current user's image if available
                  alt="You"
                  sx={{ width: 32, height: 32, ml: 1 }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {/* Input Field */}
     
<Box
  sx={{
    p: 2,
    borderTop: '1px solid #eee',
    display: 'flex',
    alignItems: 'center',
    bgcolor: '#fff',
  }}
>
  <TextField
    fullWidth
    placeholder="Type a message here.."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
    sx={{
      bgcolor: '#f8f8f8',
      borderRadius: '20px',
      px: 2,
      py: 1,
    }}
    InputProps={{
      disableUnderline: true,
      endAdornment: (
        <InputAdornment position="end" sx={{ gap: 1 }}>
          <IconButton><Typography fontWeight="bold">@</Typography></IconButton>
          <IconButton><Typography fontWeight="bold">⚠️</Typography></IconButton>
          <IconButton><Typography fontWeight="bold">📎</Typography></IconButton>
          <IconButton><Typography fontWeight="bold">😊</Typography></IconButton>
          <IconButton><Typography fontWeight="bold">🖼️</Typography></IconButton>
          <IconButton><Typography fontWeight="bold">🔗</Typography></IconButton>
        </InputAdornment>
      )
    }}
  />

  <IconButton
    onClick={handleSend}
    sx={{
      ml: 1,
      bgcolor: '#ff1e56',
      '&:hover': { bgcolor: '#e6004c' },
      color: '#fff',
      width: 45,
      height: 45,
      borderRadius: '50%',
    }}
  >
    <SendIcon />
  </IconButton>
</Box>

    </Box>
    
  );
};

export default ChatWindow;
