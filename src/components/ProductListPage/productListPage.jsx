import React from 'react';
import { Link } from 'react-router-dom';
import { useProductListPage } from './useProductListPage';

const ProductListPage = () => {
    const { loading, products } = useProductListPage();

    const renderList = () => (
        <ul style={{ margin: '20px 0' }}>
            {products?.map(item => (
                <li key={item.id} style={{ margin: '10px 0' }}>
                    <img
                        src={item?.small_image?.url}
                        style={{ width: 100, height: 'auto' }}
                    />
                    <Link to={`/custom-plp/${item?.sku}`}>{item?.name}</Link>
                </li>
            ))}
        </ul>
    );

    return (
        <div style={{ padding: '20px' }}>
            Product List
            {loading ? <div>...</div> : renderList()}
        </div>
    );
};

export default ProductListPage;
