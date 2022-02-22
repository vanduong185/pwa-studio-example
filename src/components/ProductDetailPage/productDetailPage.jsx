import React from 'react';
import { Redirect } from 'react-router-dom';
import { useProductDetailPage } from './useProductDetailPage';

const ProductDetailPage = () => {
    const { product, loading, error, notFound } = useProductDetailPage();

    if (notFound || error) {
        return <Redirect to="/not-found"/>
    }

    return (
        <div style={{ padding: '20px' }}>
            Product Detail
            {loading ? (
                <div>...</div>
            ) : (
                product && (
                    <div style={{ padding: '20px 0' }}>
                        <h2>{product.name}</h2>
                        <img src={product.small_image?.url} />
                    </div>
                )
            )}
        </div>
    );
};

export default ProductDetailPage;
