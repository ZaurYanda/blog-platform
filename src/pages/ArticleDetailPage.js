import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { fetchArticle } from '../api/articles';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticle(slug)
      .then((data) => {
        setArticle(data.article);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!article) return null;

  return (
    <div>
      <h1>{article.title}</h1>
      <ReactMarkdown>{article.body}</ReactMarkdown>
    </div>
  );
}
