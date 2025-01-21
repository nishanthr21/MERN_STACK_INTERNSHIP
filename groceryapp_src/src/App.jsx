import { useState } from 'react';
import Product from './Product';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Groceries', inStock: true },
    { id: 2, name: 'Veggies', inStock: true },
    { id: 3, name: 'Fruits', inStock: false },
  ]);

  const toggleStatus = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, inStock: !product.inStock }
          : product
      )
    );
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Departmental Store Provision System</h1>
      <Product products={products} onToggle={toggleStatus} />
    </div>
  );
};

export default App;