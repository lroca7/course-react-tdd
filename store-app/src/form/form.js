import React, { useState } from "react";
import { Button, InputLabel, NativeSelect, TextField } from "@mui/material";

export const Form = () => {
    const [formErrors, setFormErrors] = useState({
        name: "",
        size: "",
        type: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, size, type } = e.target.elements;

        if (!name.value) {
            setFormErrors((prevState) => ({
                ...formErrors,
                name: "The name is required",
            }));
        }
        if (!size.value) {
            setFormErrors((prevState) => ({
                ...prevState,
                size: "The size is required",
            }));
        }

        if (!type.value) {
            setFormErrors((prevState) => ({
                ...prevState,
                type: "The type is required",
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        setFormErrors({
            ...formErrors,
            [name]: value.length ? "" : `The ${name} is required`,
        });
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

                <Button type="submit">Submit</Button>
            </form>
        </>
    );
};

export default Form;
