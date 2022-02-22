import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';

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

export const useProductDetailPage = () => {
    const params = useParams();

    const [runQuery, queryResponse] = useLazyQuery(GET_PRODUCT_DETAIL_QUERY, {
        fetchPolicy: 'cache-and-network'
    });

    const { data, loading, error } = queryResponse;

    const product = data?.products?.items[0];
    const notFound = data?.products?.items?.length === 0;

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

    return {
        product,
        loading,
        error,
        notFound
    };
};
