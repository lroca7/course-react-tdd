import React, { useState } from "react";
import { Button, InputLabel, NativeSelect, TextField } from "@mui/material";
import { saveProduct } from "../services/productServices";
import { CREATED_STATUS } from "../const/httpStatus";

export const Form = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
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

        const response = await saveProduct();

        if (response.status === CREATED_STATUS) {
            setIsSuccess(true);
        }
        setIsSaving(false);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        validateField({ name, value });
    };
    return (
        <>
            <h1>Create product</h1>
            {isSuccess && <p>Product stored</p>}
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
