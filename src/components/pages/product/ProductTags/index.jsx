import { formatDiscount } from 'helpers/format';

import styles from './index.module.scss';

const ProductTags = ({ currentPrice, actualPrice, tags = [] }) => {
  return (
    <div className={styles.tags_wrapper}>
      {currentPrice < actualPrice && (
        <span className={styles.discount_tag}>
          {formatDiscount({ currentPrice, actualPrice })}
        </span>
      )}
      {tags.map((tag) => (
        <></>
        // <span
        //   key={tag.content}
        //   className={tag.content === 'nuevo' ? styles.tag_alt : styles.tag}
        // >
        //   {tag.content}
        // </span>
      ))}
    </div>
  );
};

export default ProductTags;
