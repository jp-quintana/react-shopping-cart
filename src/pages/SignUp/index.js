import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSignUp } from 'hooks/useSignUp';

import Loader from 'common/Loader';
import Toast from 'common/Toast';
import ToastMessage from 'common/ToastMessage';

import styles from './index.module.scss';

const SignUp = () => {
  const { state: routerState } = useLocation();

  const { signUp, isLoading, error, defaultValue } = useSignUp();

  const [toastMessage, setToastMessage] = useState(null);

  const nameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUp({
      name: nameInput.current.value,
      lastName: lastNameInput.current.value,
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
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <section className={styles.nav_section}></section>
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={`${styles.wrapper} main-container`}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h2 className={styles.title}>Crear cuenta</h2>
                  <label className={styles.label}>
                    <span>Nombre:</span>
                    <input
                      defaultValue={defaultValue ? defaultValue.name : ''}
                      className={styles.input}
                      type="text"
                      placeholder="Nombre"
                      required
                      ref={nameInput}
                    />
                  </label>
                  <label className={styles.label}>
                    <span>Apellido:</span>
                    <input
                      defaultValue={defaultValue ? defaultValue.lastName : ''}
                      className={styles.input}
                      type="text"
                      placeholder="Apellido"
                      required
                      ref={lastNameInput}
                    />
                  </label>
                  <label className={styles.label}>
                    <span>Email:</span>
                    <input
                      className={styles.input}
                      type="email"
                      placeholder="tunombre@email.com"
                      required
                      ref={emailInput}
                    />
                  </label>
                  <label className={styles.label}>
                    <span>Contraseña:</span>
                    <input
                      className={styles.input}
                      type="password"
                      required
                      ref={passwordInput}
                    />
                  </label>
                  <button className={styles.button} type="submit">
                    Crear Cuenta
                  </button>
                </form>
                <p className={styles.login}>
                  ¿Ya tenés cuenta?{' '}
                  <Link to="/cuenta/login" state={routerState}>
                    Ingresá
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SignUp;
