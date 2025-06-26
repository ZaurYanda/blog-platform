import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { likeArticle, unlikeArticle } from './articleSlice';

export const fetchArticleBySlug = createAsyncThunk('singleArticle/fetchBySlug', async (slug, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`);
    if (!res.ok) throw new Error('Ошибка при загрузке статьи');
    const data = await res.json();
    return data.article;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const singleArticleSlice = createSlice({
  name: 'singleArticle',
  initialState: {
    article: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearArticle: (state) => {
      state.article = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(likeArticle.fulfilled, (state, action) => {
        state.article = action.payload;
      })
      .addCase(unlikeArticle.fulfilled, (state, action) => {
        state.article = action.payload;
      })

      .addCase(fetchArticleBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.article = action.payload;
        state.loading = false;
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearArticle } = singleArticleSlice.actions;
export default singleArticleSlice.reducer;
