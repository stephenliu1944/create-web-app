module.exports = {
    // 'extends': 'stylelint-config-standard',
    'rules': {
        'color-no-invalid-hex': true,
        'font-family-no-duplicate-names': true,
        'font-family-no-missing-generic-family-keyword': true,
        'string-no-newline': true,
        'unit-no-unknown': true,
        'property-no-unknown': true,
        'declaration-block-no-duplicate-properties': true,
        'selector-id-pattern': '[A-Za-z0-9]+',          // id驼峰命名
        'selector-class-pattern': '[A-Za-z0-9]+',       // class驼峰命名
        'selector-pseudo-class-case': 'lower',
        'selector-pseudo-class-no-unknown': [true, {
            ignorePseudoClasses: ['global']
        }],
        'selector-pseudo-element-no-unknown': true,
        'selector-type-no-unknown': true,
        'selector-type-case': 'lower',
        'media-feature-name-no-unknown': true,
        'at-rule-no-unknown': true,
        'comment-no-empty': true,
        'string-quotes': 'single',
        'property-case': 'lower',
        'max-empty-lines': 1,
        'no-eol-whitespace': true,
        'function-name-case': 'lower'
        // 'indentation': 'tab'
        // TODO...
    }
};