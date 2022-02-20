import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

export const GET_PRODUCT_DETAIL_QUERY = gql`
    query getProductDetailForProductPage($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
            items {
                uid
                name
                sku
                small_image {
                    url
                }
            }
        }
    }
`;

const ProductDetailPage = () => {
    const params = useParams();
    const [product, setProduct] = useState();

    const [runQuery, queryResponse] = useLazyQuery(GET_PRODUCT_DETAIL_QUERY, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const { data } = queryResponse;

    useEffect(() => {
        const { sku } = params;
        if (sku) {
            runQuery({
                variables: {
                    sku
                }
            });
        }
    }, [params]);

    useEffect(() => {
        if (data?.products?.items?.length) {
            setProduct(data?.products?.items[0]);
        }
    }, [data]);

    return (
        <div style={{ padding: '20px' }}>
            Product Detail
            {product && (
                <div style={{ padding: '20px 0' }}>
                    <h2>{product.name}</h2>
                    <img src={product.small_image?.url} />
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
