const BASE_URL = 'https://blog-platform.kata.academy/api';

export async function fetchArticles(page = 1, limit = 10) {
  const token = localStorage.getItem('token'); // 🔑 получаем токен из localStorage
  const offset = (page - 1) * limit;

  const res = await fetch(`${BASE_URL}/articles?limit=${limit}&offset=${offset}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Token ${token}` }), // ✅ если токен есть — добавляем
    },
  });

  if (!res.ok) throw new Error('Failed to load articles');
  return res.json();
}

export async function fetchArticle(slug) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/articles/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Token ${token}` }), // ✅ тоже добавляем токен
    },
  });

  if (!res.ok) throw new Error('Failed to load article');
  return res.json();
}
