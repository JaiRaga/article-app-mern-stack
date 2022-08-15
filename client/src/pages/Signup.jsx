import React, { useState, useEffect } from 'react';
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
import { registerUser } from '../redux/actions/auth';

const Signup = () => {
  const [registerState, setRegisterState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = registerState;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const onChange = (e) =>
    setRegisterState({ ...registerState, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, password);
    dispatch(registerUser({ username, email, password }));
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
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Stack
          spacing={2}
          sx={{
            flex: 1,
            padding: 10,
          }}
        >
          <Typography alignSelf='center' variant='h4'>
            Signup
          </Typography>
          <TextField
            id='username'
            label='username'
            name='username'
            value={username}
            onChange={onChange}
            variant='standard'
          />
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
            Signup
          </Button>
          <Typography>
            Already have an account? <Link to='/login'>Login</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Signup;
