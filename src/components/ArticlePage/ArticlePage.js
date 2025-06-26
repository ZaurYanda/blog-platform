import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';
import ReactMarkdown from 'react-markdown';
import { fetchArticleBySlug, clearArticle } from '../../store/singleArticleSlice';
import { deleteArticle, likeArticle, unlikeArticle } from '../../store/articleSlice';
import styles from './ArticlePage.module.scss';

const fallbackImg = 'https://static.productionready.io/images/smiley-cyrus.jpg';

export default function ArticlePage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { article, loading, error } = useSelector((state) => state.singleArticle);
  const { user } = useSelector((state) => state.user || {});

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug));
    return () => dispatch(clearArticle());
  }, [dispatch, slug]);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) {
    if (error.includes('Not Found') || error.includes('404')) {
      return <div className={styles.error}>Статья не найдена</div>;
    }
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  if (!article) return null;

  const { title, description, body, tagList, author, createdAt } = article;

  const formattedDate = new Date(createdAt).toLocaleDateString('ru-RU');
  const isAuthor = user?.username === author?.username;
  const uniqueTags = [...new Set(tagList)];

  const handleLike = () => {
    if (!user?.token) {
      navigate('/sign-in'); // Редирект, если не авторизован
      return;
    }

    if (article.favorited) {
      dispatch(unlikeArticle(article.slug));
    } else {
      dispatch(likeArticle(article.slug));
    }
  };

  const handleEdit = () => {
    navigate(`/articles/${article.slug}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure to delete this article?')) {
      dispatch(deleteArticle(article.slug)).then((res) => {
        if (!res.error) {
          navigate('/');
        }
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{title}</h1>
            <Button
              type="text"
              icon={article.favorited ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
              onClick={handleLike}
              className={styles.likeButton}
            >
              {article.favoritesCount}
            </Button>
          </div>

          <div className={styles.meta}>
            <img src={author.image || fallbackImg} alt="avatar" className={styles.avatar} />
            <div>
              <div className={styles.username}>{author.username}</div>
              <div className={styles.date}>{formattedDate}</div>
              {isAuthor && (
                <div className={styles.controls}>
                  <button type="button" onClick={handleDelete} className={styles.delete}>
                    Delete
                  </button>
                  <button type="button" onClick={handleEdit} className={styles.edit}>
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.tags}>
          {uniqueTags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <p className={styles.fullDescription}>{description}</p>

        <div className={styles.body}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
