import CollectionCard from './CollectionCard';

import { COLLECTIONS as collections } from './data';

import styles from './index.module.scss';

const CollectionsSection = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <h2 className={styles.title}>Collections</h2>
        <div className={styles.grid_container}>
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              id={collection.id}
              image={collection.image}
              title={collection.title}
              text={collection.text}
              url={collection.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
