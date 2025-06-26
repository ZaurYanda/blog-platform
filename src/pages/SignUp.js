/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import classNames from 'classnames';
import styles from './SignUp.module.scss';
import { registerUser } from '../store/userSlice';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchedPassword = watch('password');

  const onSubmit = (data) => {
    const { username, email, password } = data;
    dispatch(registerUser({ username, email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.card}>
        <h2 className={styles.title}>Create new account</h2>

        <label htmlFor="username">
          Username
          <input
            id="username"
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' },
              maxLength: { value: 20, message: 'Username must be at most 20 characters' },
            })}
            className={classNames({ [styles.inputError]: errors.username })}
          />
          {errors.username && <p className={styles.error}>{errors.username.message}</p>}
        </label>

        <label htmlFor="email">
          Email address
          <input
            id="email"
            type="email"
            placeholder="Email address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email',
              },
            })}
            className={classNames({ [styles.inputError]: errors.email })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </label>

        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
              maxLength: { value: 40, message: 'Maximum 40 characters' },
            })}
            className={classNames({ [styles.inputError]: errors.password })}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </label>

        <label htmlFor="repeatPassword">
          Repeat Password
          <input
            id="repeatPassword"
            type="password"
            placeholder="Repeat password"
            {...register('repeatPassword', {
              required: 'Please repeat password',
              validate: (value) => value === watchedPassword || 'Passwords must match',
            })}
            className={classNames({ [styles.inputError]: errors.repeatPassword })}
          />
          {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword.message}</p>}
        </label>

        <label htmlFor="agreement" className={styles.checkbox}>
          <input
            id="agreement"
            type="checkbox"
            {...register('agreement', { required: 'You must agree before submitting.' })}
          />
          I agree to the processing of my personal information
        </label>
        {errors.agreement && <p className={styles.error}>{errors.agreement.message}</p>}

        {error?.errors && (
          <ul className={styles.errorList}>
            {Object.entries(error.errors).map(([key, value]) => (
              <li key={key}>
                {key}: {Array.isArray(value) ? value.join(', ') : value}
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className={styles.submitButton}>
          Create
        </button>

        <p className={styles.footerText}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </div>
  );
}
