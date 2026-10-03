module.exports = {
    "env": {
        "node": true,
        "es2021": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        // DevOps Trap 6: Missing semicolon rule (Will cause 'npm run lint' to fail if missing)
        "semi": ["error", "always"],
        "no-unused-vars": "warn"
    }
};
