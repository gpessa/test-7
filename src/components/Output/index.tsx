import React from 'react';

import styles from './style.module.css';

const Output: React.FC<{ value: SortedProduct }> = ({ value }) => {
  const stringify = (obj: object) => JSON.stringify(obj, null, 4)
  return <pre className={styles.Output}>{stringify(value)}</pre>
}

export default Output