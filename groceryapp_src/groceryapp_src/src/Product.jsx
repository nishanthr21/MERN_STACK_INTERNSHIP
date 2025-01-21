import PropTypes from 'prop-types';

const Product = ({ products, onToggle }) => {
    return (
        <div>
            <h2>Product Purchasing Status</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {products.map((product) => (
                    <li
                        key={product.id}
                        style={{
                            margin: '12px 0',
                            color: product.inStock ? 'green' : 'red',
                            fontWeight: 'bold',
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={product.inStock}
                            onChange={() => onToggle(product.id)}
                        />
                        {product.name} - {product.inStock ? 'In Stock' : 'Out Of Stock'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

Product.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            inStock: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default Product;