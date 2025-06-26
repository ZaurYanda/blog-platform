import { useEffect, useState } from 'react';
import { Spin, Pagination } from 'antd';
import { fetchArticles } from '../api/articles';
import ArticlePreview from '../components/ArticlePreview/ArticlePreview';

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);
  const limit = 5;
  const totalPages = Math.ceil(articlesCount / limit);

  useEffect(() => {
    setLoading(true);
    fetchArticles(page, limit)
      .then((data) => {
        setArticles(data.articles);
        setArticlesCount(data.articlesCount);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  if (loading)
    return (
      <Spin
        size="large"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="bodyArticles">
      {articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
      {/* <button type="button" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
        Назад
      </button>
      <button type="button" onClick={() => setPage((p) => p + 1)}>
        Вперёд
      </button> */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
        <Pagination
          current={page}
          total={totalPages * 5}
          pageSize={5}
          onChange={(newPage) => setPage(newPage)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
