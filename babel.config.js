const ENV = {
    DEVELOPMENT: 'development',
    TEST: 'test',
    PRODUCTION: 'production'
};

module.exports = function(api) {
    api.cache(true);
    
    var env = process.env.NODE_ENV;
    var presets = [
        ['@babel/preset-env', {
            targets: [
                'last 2 version',
                'ie >= 9'
            ]
        }]
    ];
    var plugins = [
        '@babel/plugin-transform-runtime', 
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties', 
        '@babel/plugin-proposal-optional-chaining',
        ['@babel/plugin-proposal-pipeline-operator', { 
            'proposal': 'minimal' 
        }],
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from'
    ];

    switch (env) {
        case ENV.DEVELOPMENT:
            break;
        case ENV.TEST:
            break;
        case ENV.PRODUCTION:        
            break;
    }

    return {
        presets,
        plugins
    };
};