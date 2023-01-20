describe("Setup and teardown examples", () => {
    //Para asignar valores iniciales por ejemplo
    beforeAll(() => {
        console.log("beforeAll");
    });

    beforeEach(() => {
        console.log("beforeEach");
    });

    afterAll(() => {
        console.log("afterAll");
    });

    afterEach(() => {
        console.log("afterEach");
    });

    test("example 1", () => {
        expect(true).toBe(true);
    });
});
