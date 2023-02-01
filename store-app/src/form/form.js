import React, { useState } from "react";
import { Button, InputLabel, NativeSelect, TextField } from "@mui/material";

export const Form = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [formErrors, setFormErrors] = useState({
        name: "",
        size: "",
        type: "",
    });

    const validateField = ({ name, value }) => {
        setFormErrors((prevState) => ({
            ...prevState,
            [name]: value.length ? "" : `The ${name} is required`,
        }));
    };

    const validateForm = ({ name, size, type }) => {
        validateField({ name: "name", value: name });
        validateField({ name: "size", value: size });
        validateField({ name: "type", value: type });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const { name, size, type } = e.target.elements;

        validateForm({ name: name.value, size: size.value, type: type.value });

        await fetch("/products", {
            method: "POST",
            body: JSON.stringify({}),
        });

        setIsSaving(false);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        validateField({ name, value });
        // setFormErrors({
        //     ...formErrors,
        //     [name]: value.length ? "" : `The ${name} is required`,
        // });
    };
    return (
        <>
            <h1>Create product</h1>

            <form onSubmit={handleSubmit}>
                <TextField
                    id="name"
                    label="name"
                    name="name"
                    helperText={formErrors.name}
                    onBlur={handleBlur}
                ></TextField>
                <TextField
                    id="size"
                    label="size"
                    name="size"
                    helperText={formErrors.size}
                    onBlur={handleBlur}
                ></TextField>
                <InputLabel variant="standard" htmlFor="type">
                    Type
                </InputLabel>
                <NativeSelect
                    inputProps={{
                        name: "type",
                        id: "type",
                    }}
                >
                    <option value={""}></option>
                    <option value={"electronic"}>Electronic</option>
                    <option value={"furniture"}>Furniture</option>
                    <option value={"clothing"}>Clothing</option>
                </NativeSelect>

                {formErrors.type.length && <p>{formErrors.type}</p>}

                <Button type="submit" disabled={isSaving}>
                    Submit
                </Button>
            </form>
        </>
    );
};

export default Form;
