describe("Matchers", () => {
    test("toBe", () => {
        expect(true).toBe(true);
    });
    test("toEqual", () => {
        const data = { one: 1 };
        data["two"] = 2;
        expect(data).toEqual({ one: 1, two: 2 });
    });
});
