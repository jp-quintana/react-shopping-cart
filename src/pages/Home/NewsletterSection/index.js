import Button from 'common/Button';
import styles from './index.module.scss';

const NewsletterSection = () => {
  const newsletterSubmitHandler = (e) => {
    e.preventDefault();
  };

  // TODO: AGREGARLE FUNCIONAMIENTO AL BOTON DE ENVIO

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
            <Button type="submit" className={`${styles.button} disabled-link`}>
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
