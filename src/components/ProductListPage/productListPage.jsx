import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/RootComponents/Category/category.gql';
import { Link } from 'react-router-dom';

const ProductListPage = () => {
    const { getCategoryQuery, getFilterInputsQuery } = DEFAULT_OPERATIONS;

    const [runQuery, queryResponse] = useLazyQuery(getCategoryQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const {
        called: categoryCalled,
        loading: categoryLoading,
        error,
        data
    } = queryResponse;

    useEffect(() => {
        runQuery({
            variables: {
                currentPage: 1,
                id: '0A==',
                filters: { category_uid: { eq: 'OA==' } },
                pageSize: 12,
                sort: { position: 'ASC' }
            }
        });
    }, []);

    const products = data?.products?.items;

    return (
        <div style={{ padding: '20px'}}>
            Product List
            {products && (
                <ul style={{ margin: '20px 0'}}>
                    {products.map(item => (
                        <li key={item.id} style={{ margin: '10px 0'}}>
                            <img
                                src={item?.small_image?.url}
                                style={{ width: 100, height: 'auto' }}
                            />
                            <Link to={`/custom-plp/${item?.sku}`}>{item?.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductListPage;
