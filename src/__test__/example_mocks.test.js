import { storage } from "../lib/storage";
import { saveUsername, getUsername } from "../user";

jest.mock("../lib/storage");

test("First example", () => {});

test("Second example", () => {
    // console.log("Storage: ", storage);
    const username = "Sara Lance";
    saveUsername(username);
    expect(storage.save).toHaveBeenCalled();
    expect(storage.save).toHaveBeenCalledWith({
        key: "username",
        value: username,
    });
});

test("Third example", () => {
    // console.log("Storage: ", storage);
    const username = "Sara Lance";
    storage.get.mockReturnValueOnce(username);

    const result = getUsername(username);
    expect(result).toBe(username);
    expect(storage.get).toHaveBeenCalledTimes(1);
    expect(storage.get).toHaveBeenCalledWith({
        key: "username",
    });
});

// test("Zero example", () => {
//     const myMock = jest
//         .fn()
//         .mockReturnValueOnce(true)
//         .mockReturnValueOnce("hello world")
//         .mockReturnValueOnce(5);

//     const result1 = myMock();
//     const result2 = myMock();
//     const result3 = myMock();

//     expect(myMock).toHaveBeenCalledTimes(3);

//     expect(result1).toBe(true);
//     expect(result2).toBe("hello world");
//     expect(result3).toBe(5);
// });
