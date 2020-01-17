declare module 'react-json-editor-ajrm';
declare module 'react-json-editor-ajrm/locale/en'; 


interface Product {
  id: number
  price: number
}

interface Array<T> {
  picture?: string
}

interface SortedProduct {
  highest: Product[] | null
  lowest: Product[] | null
}