import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = 'https://blog-platform.kata.academy/api';
export const createArticleThunk = createAsyncThunk(
  'articles/createArticle',
  async (articleData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://blog-platform.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ article: articleData }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.errors);
      }

      return response.json();
    } catch (err) {
      return rejectWithValue('Network error');
    }
  }
);

export const deleteArticle = createAsyncThunk('article/deleteArticle', async (slug, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.errors);
    }

    return slug;
  } catch (err) {
    return rejectWithValue('Network error');
  }
});

export const updateArticleThunk = createAsyncThunk(
  'article/updateArticle',
  async ({ slug, articleData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ article: articleData }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(JSON.stringify(error.errors));
      }

      const data = await response.json();
      return data.article;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const likeArticle = createAsyncThunk('article/like', async (slug, { getState, rejectWithValue }) => {
  const token = getState().user.user?.token;
  try {
    const res = await fetch(`${API_URL}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await res.json();
    return data.article;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const unlikeArticle = createAsyncThunk('article/unlike', async (slug, { getState, rejectWithValue }) => {
  const token = getState().user.user?.token;
  try {
    const res = await fetch(`${API_URL}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await res.json();
    return data.article;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArticleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.articles.unshift(action.payload.article);
      })
      .addCase(createArticleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = state.articles.filter((a) => a.slug !== action.payload);
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;
