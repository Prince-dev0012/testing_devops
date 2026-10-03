// Simulate a test suite that DevOps CI will run

describe('App Test Suite', () => {
    test('Basic Math works', () => {
        expect(2 + 2).toBe(4);
    });

    test('String manipulation', () => {
        const text = 'DevOps';
        expect(text.toLowerCase()).toBe('devops');
    });

    // DevOps Trap 5: Failing Test (Should be caught by 'npm test' stage)
    test('This test is intentionally broken to fail the CI pipeline', () => {
        const expectedStatus = 'PASSED';
        const actualStatus = 'FAILED';
        // This will throw an error and fail the test step in your pipeline
        expect(actualStatus).toBe(expectedStatus); 
    });
});
