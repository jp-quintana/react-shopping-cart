import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLogin } from 'hooks/useLogin';

import styles from './index.module.scss';

const Login = () => {
  const navigate = useNavigate();

  const { login, isLoading, error } = useLogin();

  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });

    if (!error) {
      navigate('/');
    }
  };

  return (
    <section className={styles.section}>
      <div className="main-container">
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Ingresá a tu cuenta:</h2>
          <label>
            <span>Email:</span>
            <input
              className={styles.input}
              type="email"
              placeholder="tunombre@email.com"
              required
              ref={emailInput}
            />
          </label>
          <label>
            <span>Contraseña:</span>
            <input
              className={styles.input}
              type="password"
              required
              ref={passwordInput}
            />
          </label>
          <button className={styles.button} type="submit">
            Iniciar Sesión
          </button>
        </form>
        <p className={styles.no_account}>
          ¿No tenés cuenta? <Link to="/cuenta/signup">Crear cuenta</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
