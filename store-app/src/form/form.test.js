import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import { Form } from "./form";

// eslint-disable-next-line testing-library/no-render-in-setup
beforeEach(() => render(<Form />));

describe("When the form is mounted", () => {
    test("There must be a create product form page", () => {
        // expect(screen.queryByText(/create product/i)).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: /create product/i })
        ).toBeInTheDocument();
    });

    it("should exists the fields: name, size, type(electronic, furniture, clothing)", () => {
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/size/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/type/i)).toBeInTheDocument();

        expect(screen.getByText(/electronic/i)).toBeInTheDocument();
        expect(screen.getByText(/furniture/i)).toBeInTheDocument();
        expect(screen.getByText(/clothing/i)).toBeInTheDocument();
    });

    it("should exists the submit button", () => {
        expect(
            screen.getByRole("button", { name: /submit/i })
        ).toBeInTheDocument();
    });
});

describe("When the user submit the form whitout values", () => {
    it("should display validation msj", () => {
        expect(
            screen.queryByText(/The name is required/i)
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(/The size is required/i)
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(/The type is required/i)
        ).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        expect(screen.getByText(/The name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/The size is required/i)).toBeInTheDocument();
        expect(screen.getByText(/The type is required/i)).toBeInTheDocument();
    });
});

describe("When the user blurs an empty field", () => {
    it("should display validation error msj for the input name", () => {
        fireEvent.blur(screen.getByLabelText(/name/i), {
            target: { name: "name", value: "" },
        });

        // eslint-disable-next-line testing-library/prefer-presence-queries
        expect(screen.queryByText(/the name is required/i)).toBeInTheDocument();
    });

    it("should display validation error msj for the input size", () => {
        fireEvent.blur(screen.getByLabelText(/size/i), {
            target: { name: "size", value: "" },
        });

        // eslint-disable-next-line testing-library/prefer-presence-queries
        expect(screen.queryByText(/the size is required/i)).toBeInTheDocument();
    });
});
