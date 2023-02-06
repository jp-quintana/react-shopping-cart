import { useRef, useEffect } from 'react';

import { useNewsletter } from 'hooks/useNewsletter';

import Button from 'components/Button';
import Loader from 'components/Loader';

import styles from './index.module.scss';

const NewsletterSection = () => {
  const { subscribeToNewsletter, isLoading, success, error } = useNewsletter();

  const emailInputRef = useRef();
  const scrollToRef = useRef();

  const scrollTo = () => {
    scrollToRef.current.scrollIntoView();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;

    // console.log(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(email));

    await subscribeToNewsletter({ email });
  };

  useEffect(() => {
    if (success || error) {
      scrollTo();
    }
  }, [success, error]);

  console.log(success);
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <h3 className={styles.title}>Subscribite a nuestra newsletter</h3>
        <div>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            ref={scrollToRef}
          >
            {!success && (
              <>
                <input
                  className={styles.input}
                  placeholder="Tu Dirección de Email"
                  type="email"
                  ref={emailInputRef}
                  required
                />
                <Button type="submit" className={styles.button}>
                  Enviar
                </Button>
              </>
            )}
            {success && (
              <Button type="button" className={styles.success} disabled>
                {success.content}
              </Button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
