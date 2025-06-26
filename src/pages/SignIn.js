/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { loginUser } from '../store/userSlice';
import styles from './SignIn.module.scss';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  console.log('error', error);

  return (
    <div className={styles.wrapper}>
      <form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Sign In</h2>
        <div className={styles.field}>
          <label htmlFor="email">
            Email address
            <input
              id="email"
              type="email"
              placeholder="Email address"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
            />
          </label>
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
              })}
            />
          </label>
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        {error?.errors && (
          <ul className={styles.errorList}>
            {Object.entries(error.errors).map(([key, messages]) => (
              <li key={key}>
                {key}: {Array.isArray(messages) ? messages.join(', ') : messages}
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        <p className={styles.footerText}>
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </div>
  );
}
