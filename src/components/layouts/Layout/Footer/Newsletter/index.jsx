import { useState, useRef, useEffect } from 'react';

import { useNewsletter } from 'hooks/useNewsletter';

import { Button, Toast, ToastMessage } from 'components/common';

import styles from './index.module.scss';

const Newsletter = () => {
  const { subscribeToNewsletter, success, error } = useNewsletter();

  const emailInputRef = useRef();
  const scrollToRef = useRef();

  const [toastMessage, setToastMessage] = useState(null);

  const scrollTo = () => {
    scrollToRef.current.scrollIntoView();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;

    await subscribeToNewsletter({ email });
  };

  useEffect(() => {
    if (success || error) {
      scrollTo();
    }

    if (error) {
      setToastMessage({ error, message: error.message });
    }
  }, [success, error]);

  return (
    <>
      <Toast content={toastMessage}>
        {toastMessage && (
          <ToastMessage
            close={() => setToastMessage(null)}
            content={toastMessage}
          />
        )}
      </Toast>
      <section className={styles.section}>
        <div className={styles.container}>
          <h3 className={styles.title}>Sign up for the FLAAKKO newsletter</h3>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            ref={scrollToRef}
          >
            {!success && (
              <>
                <input
                  className={styles.input}
                  placeholder="Your email address"
                  type="email"
                  ref={emailInputRef}
                  required
                />
                <Button type="submit" className={styles.button}>
                  Sign up
                </Button>
              </>
            )}
            {success && (
              <Button type="button" className={styles.success} disabled>
                {success.message}
              </Button>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
