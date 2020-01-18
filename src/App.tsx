import React, { useState } from 'react';
import JSONInput from 'react-json-editor-ajrm';

import styles from './App.module.css';
import Output from './components/Output';
import { PRODUCTS } from './mocks';
import { sortProducts } from './utils/index';

function App() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const [size, setSize] = useState<number>(5)

  const handleSizeChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(evt.target.value)
    setSize(size)
  }

  return (
    <div className={styles.App}>
      <div className={styles.AppColumn}>
        <h3 className={styles.AppColumnTitle}>Products</h3>
        <div className={styles.AppColumnContent}>
          <JSONInput
            height="100%"
            placeholder={products}
            className={styles.AppEditor}
            onChange={({ jsObject, error }: { jsObject: Product[], error: boolean }) => !error && setProducts(jsObject)}
          />
        </div>
      </div>
      <div className={styles.AppColumn}>
        <h3 className={styles.AppColumnTitle}>Size</h3>
        <div className={styles.AppColumnContent}>
         <input type="text" value={size} onChange={handleSizeChanged} />
        </div>
      </div>
      <div className={styles.AppColumn}>
        <h3 className={styles.AppColumnTitle}>Result</h3>
        <div className={styles.AppColumnContent}>
          <Output value={sortProducts([...products], { size })} />
        </div>
      </div>
    </div>
  );
}

export default App;
