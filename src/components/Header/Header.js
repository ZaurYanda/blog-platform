import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/userSlice';
import styles from './Header.module.scss';

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Realworld Blog
        </Link>
        {user ? (
          <div className={styles.auth}>
            <Link to="/new-article" className={styles.create}>
              Create article
            </Link>
            <div className={styles.userInfo}>
              <Link to="/profile" className={styles.username}>
                {user.username}
              </Link>
              <img
                src={user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                alt="avatar"
                className={styles.avatar}
              />
            </div>
            <button type="button" className={styles.logout} onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className={styles.auth}>
            <Link to="/sign-in" className={styles.signIn}>
              Sign In
            </Link>
            <Link to="/sign-up" className={styles.signUp}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
