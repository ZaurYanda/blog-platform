/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchArticleBySlug } from '../../store/singleArticleSlice';
import { updateArticleThunk } from '../../store/articleSlice';
import styles from './EditArticlePage.module.scss';

export default function EditArticlePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { article } = useSelector((state) => state.singleArticle || {});
  const { user } = useSelector((state) => state.user || {});

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (article) {
      setValue('title', article.title);
      setValue('description', article.description);
      setValue('body', article.body);
      setValue(
        'tagList',
        article.tagList.map((tag) => ({ value: tag }))
      );
    }
  }, [article, setValue]);

  const onSubmit = (data) => {
    const articleData = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList.map((tag) => tag.value).filter(Boolean),
    };

    dispatch(updateArticleThunk({ slug, articleData, token: user.token })).then((res) => {
      if (!res.error) {
        navigate(`/articles/${res.payload.slug}`);
      }
    });
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className={styles.wrapperEdit}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>Edit article</h2>

        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          id="title"
          {...register('title', { required: 'Title is required' })}
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          placeholder="Article title"
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}

        <label htmlFor="description" className={styles.label}>
          Short description
        </label>
        <input
          id="description"
          {...register('description', { required: 'Description is required' })}
          className={styles.input}
          placeholder="Short description"
        />
        {errors.description && <p className={styles.error}>{errors.description.message}</p>}

        <label htmlFor="body" className={styles.label}>
          Text
        </label>
        <textarea
          id="body"
          {...register('body', { required: 'Text is required' })}
          className={styles.textarea}
          placeholder="Text"
        />
        {errors.body && <p className={styles.error}>{errors.body.message}</p>}

        <label className={styles.label}>
          Tags
          <div className={styles.tags}>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.tagRow}>
                <label htmlFor={`tag-${index}`} className={styles.visuallyHidden} />

                <input
                  id={`tag-${index}`}
                  {...register(`tagList.${index}.value`)}
                  className={styles.tagInput}
                  placeholder="Tag"
                />

                <button type="button" onClick={() => remove(index)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>
            ))}

            <button type="button" onClick={() => append({ value: '' })} className={styles.addTagButton}>
              Add tag
            </button>
          </div>
        </label>

        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
}
