import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './ArticlePreview.module.scss';
import { likeArticle, unlikeArticle } from '../../store/articleSlice';

export default function ArticlePreview({ article }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user || {});

  const { title, slug, favoritesCount, favorited, tagList, description, author, createdAt } = article;

  const handleLike = () => {
    if (!user?.token) return;

    if (favorited) {
      dispatch(unlikeArticle(slug));
    } else {
      dispatch(likeArticle(slug));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.titleRow}>
          <Link to={`/articles/${slug}`} className={styles.title}>
            {title}
          </Link>
          <span className={styles.likes}>
            <Button
              type="text"
              icon={favorited ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined style={{ color: 'gray' }} />}
              onClick={handleLike}
              className={styles.likeButton}
            />
            {favoritesCount}
          </span>
        </div>

        <div className={styles.tags}>
          {[...new Set(tagList)].map((tag) => (
            <span key={`${slug}-${tag}`} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <p className={styles.previewDescription}>{description}</p>
      </div>

      <div className={styles.right}>
        <div>
          <div className={styles.authorName}>{author.username}</div>
          <div className={styles.date}>{new Date(createdAt).toLocaleDateString('ru-RU')}</div>
        </div>
        <img
          src={author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
          alt="avatar"
          className={styles.avatar}
        />
      </div>
    </div>
  );
}

ArticlePreview.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    favoritesCount: PropTypes.number,
    favorited: PropTypes.bool,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
    }),
  }).isRequired,
};
