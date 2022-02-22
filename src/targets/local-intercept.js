const routerList = require('../routers.js');
const componentOverrideMapping = require('./componentOverrideMapping');
const moduleOverridePlugin = require('./moduleOverrideWebpackPlugin');

module.exports = targets => {
    // routers
    targets
        .of('@magento/venia-ui')
        .routes.tap(routes => [...routes, ...routerList()]);

    // override components
    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
    });

    // add env variable
    const buildpackTargets = targets.of('@magento/pwa-buildpack');
    buildpackTargets.envVarDefinitions.tap(defs => {
        defs.sections.push({
            name: 'Author settings',
            variables: [
                {
                    name: 'AUTHOR_DEV_NAME',
                    type: 'str',
                    desc: 'Author developer name'
                }
            ]
        });
    });

    // page builder
    targets.of('@magento/pagebuilder').customContentTypes.tap(contentTypes => {
        contentTypes.add({
            contentType: 'text',
            importPath: require.resolve('../components/CustomText')
        });
    });
};
