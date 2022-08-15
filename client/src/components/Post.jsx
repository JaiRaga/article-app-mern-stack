import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, Typography, Checkbox } from '@mui/material';
import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addLike } from '../redux/actions/article';

const Post = ({ article }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { articles, isLoading } = useSelector((state) => state.article);

  const date = moment(article?.createdAt).format('MMMM Do YYYY, h:mm:ss a');
  // const isLiked = articles.likes.length && articles.likes.filter((like) => like.owner === user._id);
  return (
    <Box
      bgcolor='blueviolet'
      flex={1}
      mt={1}
      sx={{
        width: 450,
        height: 300,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 1,
      }}
    >
      <Box sx={{ margin: 5 }}>
        {/* Name */}
        <Typography variant='h5'>{article.owner.username}</Typography>
        {/* date of post */}
        <Typography variant='caption'>{date}</Typography>
      </Box>
      <Box sx={{ margin: 5 }}>
        {/* title */}
        <Typography variant='h5'>{article.title}</Typography>
        {/* description */}
        <Typography>{article.description}</Typography>
        {/* like */}
        <Box
          // bgcolor="white"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={
              true ? <Favorite sx={{ color: 'red' }} /> : <Favorite />
            }
            onClick={() => dispatch(addLike(article._id))}
          />
          <Typography>{article.likes.length}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
