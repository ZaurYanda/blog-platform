import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import articlesReducer from './articleSlice';
import singleArticleReducer from './singleArticleSlice';
import editProfileReducer from './editProfileSlice';

const preloadedState = {
  user: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
  },
};

const store = configureStore({
  reducer: {
    user: userReducer,
    articles: articlesReducer,
    singleArticle: singleArticleReducer,
    editProfile: editProfileReducer,
  },
  preloadedState,
});

export default store;
