/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './EditProfile.module.scss';
import { updateProfile } from '../store/editProfileSlice';
import { setUser } from '../store/userSlice';

export default function EditProfileForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      image: user?.image || '',
    },
  });

  const onSubmit = (data) => {
    const updatedData = {
      username: data.username,
      email: data.email,
      password: data.password || undefined, // отправляем, только если заполнено
      image: data.image || undefined,
    };

    const result = dispatch(updateProfile(updatedData));
    if (updateProfile.fulfilled.match(result)) {
      dispatch(setUser(result.payload)); // обновляем user в Redux
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Profile</h2>

      <label htmlFor="username">
        Username
        <input
          id="username"
          {...register('username', {
            required: 'Username is required',
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </label>

      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </label>

      <label htmlFor="password">
        New Password
        <input
          id="password"
          type="password"
          {...register('password', {
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
            maxLength: {
              value: 40,
              message: 'Password must be at most 40 characters',
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </label>

      <label htmlFor="image">
        Avatar image (url)
        <input
          id="image"
          {...register('image', {
            pattern: {
              value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
              message: 'Invalid image URL',
            },
          })}
        />
        {errors.image && <p>{errors.image.message}</p>}
      </label>

      <button type="submit">Save</button>
    </form>
  );
}
