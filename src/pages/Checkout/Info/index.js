import { useState } from 'react';

import styles from './index.module.scss';

const Info = () => {
  const [userInput, setUserInput] = useState({ email: '' });

  const handleEmailInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  const emailStyles = {
    label:
      userInput.email.length > 0 ? styles.label_focus : styles.label_no_focus,
    input:
      userInput.email.length > 0 ? styles.input_focus : styles.input_no_focus,
  };

  return (
    <div className={styles.info_container}>
      <form className={styles.form}>
        <p className={styles.title}>Información de contacto</p>
        <div className={styles.float_container}>
          <label htmlFor="email" className={emailStyles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            onChange={handleEmailInput}
            value={userInput.email}
            className={emailStyles.input}
          />
        </div>
      </form>
    </div>
  );
};

export default Info;
