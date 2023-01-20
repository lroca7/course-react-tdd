//callbacks
const asynCallback = (cb) => {
    setTimeout(() => {
        cb(true);
    }, 1000);
};

const asycnPromise = () => new Promise((resolve) => resolve(true));

describe("async code", () => {
    test("Example of async with callback", (done) => {
        asynCallback((result) => {
            expect(result).toBe(true);
            done();
        });
    });

    test("Example of asycn promises", () => {
        return asycnPromise().then((result) => expect(result).toBe(true));
    });

    test("Example of asycn with async/await", async () => {
        const result = await asycnPromise();
        expect(result).toBe(true);
    });
});
