import React, { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../redux/actions/auth';

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginState;

  const onChange = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Box
      sx={{
        height: '91vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          spacing={2}
          sx={{
            flex: 1,
            padding: 10,
          }}
        >
          <Typography alignSelf='center' variant='h4'>
            Login
          </Typography>
          <TextField
            id='email'
            label='email'
            name='email'
            value={email}
            onChange={onChange}
            variant='standard'
          />
          <TextField
            id='password'
            label='password'
            name='password'
            value={password}
            onChange={onChange}
            variant='standard'
          />
          <Button variant='contained' onClick={onSubmit}>
            Login
          </Button>
          <Typography>
            Don't have an account? <Link to='signup'>Signup</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
