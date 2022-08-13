import CollectionCard from './components/CollectionCard';

import { DUMMY_COLLECTIONS as collections } from './data';

import styles from './index.module.scss';

const CollectionsSection = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <h2 className={styles.title}>Categorías</h2>
        <div className={styles.grid_container}>
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              image={collection.image}
              title={collection.title}
              url={collection.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
