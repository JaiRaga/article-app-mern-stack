import {
  GET_ARTICLES,
  POST_ARTICLE,
  EDIT_ARTICLE,
  ARTICLE_ERROR,
  CLEAR_ARTICLES,
  DELETE_ARTICLE,
  UPDATE_LIKES,
  LIKE_ERROR,
  CLEAR_ARTICLE,
} from '../actions/types';

const initialState = {
  article: null,
  articles: [],
  likes: [],
  isLoading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: payload,
        isLoading: false,
      };
    case POST_ARTICLE:
      return {
        ...state,
        articles: [payload, ...state.articles],
        isLoading: false,
      };
    case EDIT_ARTICLE:
      console.log('Edit');
      return {
        ...state,
        articles: state.articles.map((article) =>
          article._id === payload._id ? payload : article
        ),
        isLoading: false,
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter((article) => article._id !== payload),
        isLoading: false,
      };
    case CLEAR_ARTICLE:
      return {
        ...state,
        article: null,
        isLoading: true,
      };
    case CLEAR_ARTICLES:
      return {
        ...state,
        articles: [],
        likes: [],
        isLoading: true,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        articles: state.articles.map((article) =>
          article._id === payload.articleId
            ? { ...article, likes: [...payload.likes] }
            : article
        ),
        isLoading: false,
      };
    default:
      return state;
  }
};
