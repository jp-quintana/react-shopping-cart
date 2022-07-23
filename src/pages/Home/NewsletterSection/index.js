import styles from './index.module.scss';
const NewsletterSection = () => {
  return (
    <section className={styles.section}>
      <p className={styles.content}>Subscribite a nuestra newsletter</p>
      <button className={styles.button}>Click acá</button>
    </section>
  );
};

export default NewsletterSection;
