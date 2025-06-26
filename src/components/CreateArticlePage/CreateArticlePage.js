/* eslint-disable react/jsx-props-no-spreading */
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './CreateArticlePage.module.scss';
import { createArticleThunk } from '../../store/articleSlice';

export default function CreateArticlePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      tagList: [{ tag: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = (data) => {
    const formattedData = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList.map((item) => item.tag.trim()).filter(Boolean),
    };

    dispatch(createArticleThunk(formattedData)).then((res) => {
      if (!res.error) navigate('/');
    });
  };

  const tagListValues = getValues('tagList');

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>Create new article</h2>

        <div className={styles.field}>
          <label htmlFor="title">
            Title
            <input
              id="title"
              type="text"
              {...register('title', { required: 'Title is required' })}
              className={classNames(styles.input, { [styles.inputError]: errors.title })}
            />
          </label>
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="description">
            Short description
            <input
              id="description"
              type="text"
              {...register('description', { required: 'Description is required' })}
              className={classNames(styles.input, { [styles.inputError]: errors.description })}
            />
          </label>
          {errors.description && <p className={styles.error}>{errors.description.message}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="body">
            Text
            <textarea
              id="body"
              {...register('body', { required: 'Text is required' })}
              className={classNames(styles.textarea, { [styles.inputError]: errors.body })}
            />
          </label>
          {errors.body && <p className={styles.error}>{errors.body.message}</p>}
        </div>

        <div className={styles.tagSection}>
          <p className={styles.label}>Tags</p>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.tagRow}>
              <label htmlFor={`tag-${index}`} className={styles.tagLabel}>
                <input
                  id={`tag-${index}`}
                  type="text"
                  {...register(`tagList.${index}.tag`)}
                  className={styles.tagInput}
                />
              </label>
              <button type="button" onClick={() => remove(index)} className={styles.deleteTag}>
                Delete
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              if (tagListValues.length === 0 || tagListValues[tagListValues.length - 1]?.tag.trim()) {
                append({ tag: '' });
              }
            }}
            className={styles.addTag}
          >
            Add tag
          </button>
        </div>

        <button type="submit" className={styles.submit}>
          Send
        </button>
      </form>
    </div>
  );
}
