import React from 'react';
import { Box, IconButton, Avatar, Tooltip, Badge } from '@mui/material';
import {
  Home,
  Forum,
  Mail,
  CalendarToday,
  Settings,
  Group,
} from '@mui/icons-material';

const Sidebar = () => {
  const icons = [
    { icon: <Home />, tooltip: 'Home' },
    { icon: <Forum />, tooltip: 'Chat' },
    { icon: <Mail />, tooltip: 'Messages' },
    { icon: <CalendarToday />, tooltip: 'Calendar' },
    { icon: <Group />, tooltip: 'Groups', badge: 2 },
    { icon: <Settings />, tooltip: 'Settings' },
  ];

  return (
    <Box
      sx={{
        width: '70px',
        bgcolor: '#5D2EDE',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
      }}
    >
      <Box>
        {icons.map((item, index) => (
          <Tooltip key={index} title={item.tooltip} placement="right">
            <IconButton sx={{ color: 'white', my: 1 }}>
              {item.badge ? (
                <Badge badgeContent={item.badge} color="warning">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      <Box>
        <Tooltip title="Natalie">
          <Avatar alt="Natalie" src="/avatar.jpg" sx={{ cursor: 'pointer' }} />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Sidebar;
