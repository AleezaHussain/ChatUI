"use client";

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const colors = ['#E6E0FF', '#FFE6BA', '#FFCCE0', '#D1FFCC', '#FFF6B7', '#DDEEFF'];

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch('http://18.143.79.95/api/chatSystem/groups/list');
        const data = await res.json();
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: '#F8F9FC',
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle1">Groups ({groups.length})</Typography>
        <IconButton size="small">
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      <List dense disablePadding>
        {groups.map((group, idx) => (
          <ListItem
            key={group.id}
            sx={{
              px: 0,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: colors[idx % colors.length],
                  color: '#000',
                  width: 30,
                  height: 30,
                  fontSize: 14,
                  mr: 1.5,
                }}
              >
                {group.name.charAt(0)}
              </Avatar>
              <Typography variant="body2">{group.name}</Typography>
            </Box>

            {group.users.length > 0 && (
              <Avatar
                src={`https://i.pravatar.cc/40?img=${idx + 10}`}
                sx={{ width: 24, height: 24, fontSize: 12, position: 'relative' }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 14,
                    right: -10,
                    fontSize: 10,
                    bgcolor: 'white',
                    borderRadius: '50%',
                    px: 0.5,
                    color: '#000',
                    boxShadow: 1,
                  }}
                >
                  +{group.users.length}
                </Box>
              </Avatar>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GroupList;
