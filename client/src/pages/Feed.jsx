import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../components/Post';
import { getAllArticles } from '../redux/actions/article';

const Feed = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const { articles, isLoading } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(getAllArticles());
  }, []);

  if (isLoading) {
    return (
      <Typography variant='h4' alignSelf='center'>
        Loading...
      </Typography>
    );
  }
  console.log('articles', articles);
  return (
    <Box
      flex={1}
      // bgcolor='darkgrey'
      mb={1}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack spacing={2}>
        {!articles.length && (
          <Typography variant='h5'>No Articles published.</Typography>
        )}
        {articles.map((article) => (
          <Post key={article._id} article={article} />
        ))}
      </Stack>
    </Box>
  );
};

export default Feed;
