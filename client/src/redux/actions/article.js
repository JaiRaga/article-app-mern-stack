import axios from 'axios';
import {
  GET_ARTICLES,
  POST_ARTICLE,
  EDIT_ARTICLE,
  ARTICLE_ERROR,
  CLEAR_ARTICLES,
  DELETE_ARTICLE,
  UPDATE_LIKES,
  LIKE_ERROR
} from './types';
import { URL_PROD } from '../../utils/backend';

// Get all articles on dashboard
export const getAllArticles = () => async (dispatch) => {
  try {
    const res = await axios.get(`${URL_PROD}/article`);
    console.log('Public');
    dispatch({
      type: GET_ARTICLES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: ARTICLE_ERROR });
  }
};

// Clear all articles
export const clearArticles = () => async (dispatch) => {
  try {
    console.log('clear');
    dispatch({ type: CLEAR_ARTICLES });
  } catch (err) {
    dispatch({ type: ARTICLE_ERROR });
  }
};

// Add/Post article
export const postArticle = (article) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ ...article });

  try {
    const res = await axios.post(`${URL_PROD}/article`, body, config);
    dispatch({ type: POST_ARTICLE, payload: res.data });
  } catch (err) {
    dispatch({ type: ARTICLE_ERROR });
  }
};

// Edit article
export const editArticle = (id, title='', description='') => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ title, description });

  try {
    console.log(1);
    const res = await axios.patch(`${URL_PROD}/article/${id}`, body, config);
    console.log(2);
    dispatch({ type: EDIT_ARTICLE, payload: res.data });
    console.log(3);
  } catch (err) {
    dispatch({ type: ARTICLE_ERROR });
  }
};

// Delete Article
export const deleteArticle = (id) => async (dispatch) => {
  try {
    await axios.delete(`${URL_PROD}/article/${id}`);

    dispatch({ type: DELETE_ARTICLE, payload: id });
  } catch (err) {
    dispatch({ type: ARTICLE_ERROR });
  }
};

// Add Like
export const addLike = (articleId) => async (dispatch) => {
  try {
    const res = await axios.patch(`${URL_PROD}/article/like/${articleId}`);
    console.log(res.data);
    dispatch({ type: UPDATE_LIKES, payload: { articleId, likes: res.data } });
  } catch (err) {
    dispatch({ type: LIKE_ERROR });
  }
};

// Remove Like
export const removeLike = (articleId) => async (dispatch) => {
  try {
    const res = await axios.patch(`${URL_PROD}/unlike/${articleId}`);
    console.log(res.data);
    dispatch({ type: UPDATE_LIKES, payload: { articleId, likes: res.data } });
  } catch (err) {
    dispatch({ type: LIKE_ERROR });
  }
};
