import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArticleIcon from '@mui/icons-material/Article';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { logout } from '../redux/actions/auth';

// modal
import Modal from '@mui/material/Modal';
import { postArticle } from '../redux/actions/article';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory()

  // modal
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitPost = () => {
    dispatch(postArticle({ title, description }));
    setTitle('');
    setDescription('');
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <ArticleIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Article
          </Typography>
          {isAuthenticated ? (
            <>
              <Button color='inherit' onClick={handleOpen}>
                Add Article
              </Button>
              <Button color='inherit' onClick={() => dispatch(logout())}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color='inherit' onClick={() => history.push('/login')}>
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                id='title'
                label='title'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant='standard'
              />
              <TextField
                id='description'
                label='description'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant='standard'
                multiline
              />
              <Button onClick={submitPost}>Add</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default Navbar;
