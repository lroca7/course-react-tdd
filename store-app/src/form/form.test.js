import React from "react";

import { render, screen } from "@testing-library/react";

import { Form } from "./form";

describe("When the form is mounted", () => {
    test("There must be a create product form page", () => {
        render(<Form />);

        // expect(screen.queryByText(/create product/i)).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: /create product/i })
        ).toBeInTheDocument();
    });
});
