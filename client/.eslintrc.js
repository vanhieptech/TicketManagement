module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaFeatures: {
            legacyDecorators: true,
        },
    },
    extends: [
        "@nuxtjs/eslint-config-typescript",
        "plugin:nuxt/recommended",
        "plugin:prettier/recommended",
        "plugin:vue/strongly-recommended",
        "prettier",
        "prettier/vue",
        "prettier/standard",
    ],
    plugins: ["@typescript-eslint", "prettier", "standard", "vue", "vuetify"],
    rules: {
        "no-eval": 0,
        "no-undef": 0,
        "no-console": 0,
        "no-implied-eval": 2,
        "prettier/prettier": 0,
        "vue/no-v-html": 0,
        "no-new": 0,
        "max-lines": [
            "error",
            { max: 1000, skipComments: true, skipBlankLines: true },
        ],
        "vue/name-property-casing": ["error", "kebab-case"],
        "@typescript-eslint/no-unused-vars": "error",
        "lines-between-class-members": [
            "off",
            "always",
            { exceptAfterSingleLine: true },
        ],
        "no-unneeded-ternary": [0, { defaultAssignment: false }],
        "vuetify/grid-unknown-attributes": "warn",
        "vuetify/no-legacy-grid": 1,
        "import/order": [
            "off",
            {
                groups: [
                    "index",
                    "sibling",
                    "parent",
                    "internal",
                    "external",
                    "builtin",
                ],
            },
        ],
        "vue/attribute-hyphenation": [
            "error",
            "always",
            {
                ignore: ["editorToolbar"],
            },
        ],
    },
};