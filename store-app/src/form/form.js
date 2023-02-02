import React, { useState } from "react";
import { Button, InputLabel, Select, TextField } from "@mui/material";

import { saveProduct } from "../services/productServices";
import {
    CREATED_STATUS,
    ERROR_SERVER_STATUS,
    INVALID_REQUEST_STATUS,
} from "../consts/httpStatus";

export const Form = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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
    const getFormValues = ({ name, size, type }) => ({
        name: name.value,
        size: size.value,
        type: type.value,
    });

    const handleFetchErrors = async (err) => {
        if (err.status === ERROR_SERVER_STATUS) {
            setErrorMessage("Unexpected error, please try again");
        }

        if (err.status === INVALID_REQUEST_STATUS) {
            const data = await err.json();
            setErrorMessage(data.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSaving(true);

        const { name, size, type } = e.target.elements;

        validateForm(getFormValues({ name, size, type }));

        try {
            const response = await saveProduct(
                getFormValues({ name, size, type })
            );

            if (!response.ok) {
                throw response;
            }

            if (response.status === CREATED_STATUS) {
                e.target.reset();
                setIsSuccess(true);
            }
        } catch (err) {
            handleFetchErrors(err);
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
            {isSuccess && <p>Product Stored</p>}
            <p>{errorMessage}</p>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="name"
                    id="name"
                    name="name"
                    helperText={formErrors.name}
                    onBlur={handleBlur}
                />
                <TextField
                    label="size"
                    id="size"
                    name="size"
                    helperText={formErrors.size}
                    onBlur={handleBlur}
                />
                <InputLabel htmlFor="type">Type</InputLabel>
                <Select
                    native
                    inputProps={{
                        name: "type",
                        id: "type",
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value="electronic">Electronic</option>
                    <option value="furniture">Furniture</option>
                    <option value="clothing">Clothing</option>
                </Select>
                {formErrors.type.length && <p>{formErrors.type}</p>}
                <Button disabled={isSaving} type="submit">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default Form;
