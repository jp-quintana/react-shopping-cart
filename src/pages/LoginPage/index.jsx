import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useLogin } from 'hooks/useLogin';

import Loader from 'components/common/Loader';
import Toast from 'components/common/Toast';
import ToastMessage from 'components/common/ToastMessage';

import styles from './index.module.scss';

const LoginPage = () => {
  const { state: routerState } = useLocation();

  const { login, isLoading, error } = useLogin();

  const [toastMessage, setToastMessage] = useState(null);

  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
  };

  useEffect(() => {
    if (error) {
      setToastMessage({ error, details: error.details });
    }
  }, [error]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      <>
        <section className={styles.nav_section}></section>
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={`${styles.wrapper} main-container`}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Log into your account</h2>
                <label className={styles.label}>
                  <span>Email:</span>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="yourname@email.com"
                    required
                    ref={emailInput}
                  />
                </label>
                <label className={styles.label}>
                  <span>Password:</span>
                  <input
                    className={styles.input}
                    type="password"
                    required
                    ref={passwordInput}
                  />
                </label>
                <button className={styles.button} type="submit">
                  Login
                </button>
              </form>
              <p className={styles.no_account}>
                New to Flaakko?{' '}
                <Link to="/account/signup" state={routerState}>
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </section>
      </>
    </>
  );
};

export default LoginPage;
