import React from "react";

import { render, screen } from "@testing-library/react";

import { Form } from "./form";

describe("When the form is mounted", () => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    beforeEach(() => render(<Form />));

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
