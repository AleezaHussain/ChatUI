"use client";

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Divider,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const ChatUserDetail = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`http://18.143.79.95/api/chatSystem/user/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    if (userId) fetchUserDetails();
  }, [userId]);

  if (!user) return null;

  return (
    <Box sx={{
      width: 400,
      bgcolor: '#fff',
      borderLeft: '1px solid #eee',
      height: '100vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    }}>
      {/* Profile Image & Basic Info */}

<Box
  sx={{
    position: 'relative',
    height: 220,
    backgroundImage: `url(${user.profileImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    color: "#050000",
    px: 2,
    pb: 2,
    
  }}
>
  {/* Overlay */}
  <Box
    sx={{
      background: '#ffffff',
      borderRadius: 4,
      px: 14,
      py: 3,
    position: 'absolute',
    top: '30%',
        
    }}
  >
    <Typography variant="h6" fontWeight="bold">
      {user.username}
    </Typography>
    <Typography variant="body2" sx={{ color: '#050000' }}>
      {user.position}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
      <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
      <Typography variant="body2" sx={{ color: '#050000' }}>
        {user.address}
      </Typography>
    </Box>
  </Box>
</Box>      {/* User Info */}
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>User Information</Typography>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="body2" color="text.secondary">Phone</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{user.phone}</Typography>
        <Typography variant="body2" color="text.secondary">Email</Typography>
        <Typography variant="body1">{user.email}</Typography>
      </Box>

      {/* Placeholder for Group Participants */}
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2">Group Participants</Typography>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 24, height: 24, fontSize: 12, bgcolor: '#81C784' }}>M</Avatar>
          <Typography variant="body2">Marketing</Typography>
        </Box>
      </Box>

      {/* Media Preview */}
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2">Media</Typography>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <img src="https://picsum.photos/id/101/100/100" alt="media1" style={{ borderRadius: 6 }} />
          <img src="https://picsum.photos/id/102/100/100" alt="media2" style={{ borderRadius: 6 }} />
          <img src="https://picsum.photos/id/103/100/100" alt="media3" style={{ borderRadius: 6 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatUserDetail;
