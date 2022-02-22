import { useQuery } from '@apollo/client';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/RootComponents/Category/category.gql';

export const useProductListPage = () => {
    const { getCategoryQuery } = DEFAULT_OPERATIONS;

    const {loading, error, data} = useQuery(getCategoryQuery, {
        variables: {
            currentPage: 1,
            id: '0A==',
            filters: { category_uid: { eq: 'OA==' } },
            pageSize: 12,
            sort: { position: 'ASC' }
        },
        fetchPolicy: 'cache-and-network'
    });

    const products = data?.products?.items;

    return { loading, error, products };
};
