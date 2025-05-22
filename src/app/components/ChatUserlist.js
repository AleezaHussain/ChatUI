"use client";

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GroupList from './GroupList';

const ChatUserList = ({ onUserClick }) => {
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState('');
  const currentUserId = 5;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [usersRes, chatsRes] = await Promise.all([
          fetch('http://18.143.79.95/api/chatSystem/users/list'),
          fetch('http://18.143.79.95/api/chatSystem/chat/list'),
        ]);
        setUsers(await usersRes.json());
        setChats(await chatsRes.json());
      } catch (err) {
        console.error('Error fetching users or chats:', err);
      }
    };
    fetchAll();
  }, []);

  // filter users by name
  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  // get the latest chat 
  const getLatestChatWithUser = userId => {
    const relevant = chats.filter(
      c =>
        (c.fromUser === currentUserId && c.toUser === userId) ||
        (c.fromUser === userId && c.toUser === currentUserId)
    );
    if (!relevant.length) return null;
    return relevant.reduce((a, b) => (b.timestamp > a.timestamp ? b : a));
  };

  // formating timestamp 
  const formatTS = ts => {
    const d = new Date(Number(ts));
    return d.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box
      sx={{
        width: 320,
        height: '100vh',
        borderRight: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Search */}
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search users"
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* User list */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <List>
          {filteredUsers.map(user => {
            const latest = getLatestChatWithUser(user.id);
            const lastMsg = latest?.message ?? 'No messages yet';
            const lastTime = latest ? formatTS(latest.timestamp) : '';

            return (
              <React.Fragment key={user.id}>
                <ListItem
                  alignItems="flex-start"
                  button
                  onClick={() => onUserClick?.(user)}
                >
                  <ListItemAvatar>
                    <Avatar alt={user.username} src={user.profileImage} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component="span"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {user.username}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          sx={{ display: 'block' }}
                        >
                          {lastMsg}
                        </Typography>
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.disabled"
                          sx={{ fontSize: '11px' }}
                        >
                          {lastTime}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            );
          })}
        </List>
      </Box>

      {/* Groups below */}
      <GroupList />
    </Box>
  );
};

export default ChatUserList;
