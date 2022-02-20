module.exports = () => [
    {
        name: 'MyGreetingRoute',
        pattern: '/greeting/:who?',
        path: require.resolve('./components/GreetingPage/greetingPage.js')
    },
    {
        name: 'CustomPLP',
        pattern: '/custom-plp',
        exact: true,
        path: require.resolve('./components/ProductListPage/index.js')
    },
    {
        name: 'CustomPDP',
        pattern: '/custom-plp/:sku',
        exact: true,
        path: require.resolve('./components/ProductDetailPage/index.js')
    },
];
