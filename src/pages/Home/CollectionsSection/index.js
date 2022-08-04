import CollectionCard from './components/CollectionCard';

import { DUMMY_COLLECTIONS as collections } from './data';

import styles from './index.module.scss';

const CollectionsSection = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Categorías</h2>
          <div className={styles.grid_container}>
            {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                imageTop={collection.image_top}
                imageBottom={collection.image_bottom}
                title={collection.title}
                url={collection.url}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
