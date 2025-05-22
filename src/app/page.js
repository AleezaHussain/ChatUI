"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/sidebar';
import ChatUserList from './components/ChatUserlist';
import ChatWindow from './components/ChatWindow';
import ChatUserDetail from './components/ChatUserDetail'; 

export default function HomePage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Sidebar />
      <ChatUserList onUserClick={setSelectedUser} />
      <ChatWindow toUser={selectedUser} />
      {selectedUser && <ChatUserDetail userId={selectedUser.id} />} 
    </Box>
  );
}
