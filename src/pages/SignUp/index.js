import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSignUp } from 'hooks/useSignUp';

import styles from './index.module.scss';

const SignUp = () => {
  let navigate = useNavigate();

  const { signUp, error, isLoading } = useSignUp();

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

    if (!error) {
      navigate('/');
    }
  };

  return (
    <section className={styles.section}>
      <div className="main-container">
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Crear cuenta:</h2>
          <label>
            <span>Nombre:</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Nombre"
              required
              ref={nameInput}
            />
          </label>
          <label>
            <span>Apellido:</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Apellido"
              required
              ref={lastNameInput}
            />
          </label>
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
            Crear Cuenta
          </button>
        </form>
        <p className={styles.login}>
          ¿Ya tenés cuenta? <Link to="/cuenta/login">Ingresá</Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
