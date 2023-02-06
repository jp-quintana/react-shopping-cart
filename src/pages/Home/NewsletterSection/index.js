import { useRef } from 'react';

import { useNewsletter } from 'hooks/useNewsletter';

import Button from 'components/Button';

import styles from './index.module.scss';

const NewsletterSection = () => {
  const { subscribeToNewsletter } = useNewsletter();

  const emailInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;

    // console.log(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(email));

    await subscribeToNewsletter({ email });

    console.log('working');
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <h3 className={styles.title}>Subscribite a nuestra newsletter</h3>
        <div>
          <form className={styles.form} onSubmit={handleSubmit} action="">
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
