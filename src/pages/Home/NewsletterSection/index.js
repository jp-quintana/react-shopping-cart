import styles from './index.module.scss';

const NewsletterSection = () => {
  const newsletterSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <h3 className={styles.title}>Subscribite a nuestra newsletter</h3>
        <div>
          <form
            className={styles.form}
            onSubmit={newsletterSubmitHandler}
            action=""
          >
            <input
              className={styles.input}
              placeholder="Tu Dirección de Email"
              type="text"
            />
            <button className={styles.button}>Enviar</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
