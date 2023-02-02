import React, { useState } from "react";
import { Button, InputLabel, Select, TextField } from "@mui/material";

import { saveProduct } from "../services/productServices";
import { CREATED_STATUS } from "../consts/httpStatus";
import { ERROR_SERVER_STATUS } from "../consts/httpStatus";

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

    const getFormValues = ({ name, size, type }) => {
        return {
            name: name.value,
            size: size.value,
            type: type.value,
        };
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const { name, size, type } = e.target.elements;

        validateForm(getFormValues({ name, size, type }));

        const response = await saveProduct(getFormValues({ name, size, type }));

        if (response.status === CREATED_STATUS) {
            e.target.reset();
            setIsSuccess(true);
        }

        if (response.status === ERROR_SERVER_STATUS) {
            setErrorMessage("Unexpected error, please try again");
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
                    value=""
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
                <Button name="submit" disabled={isSaving} type="submit">
                    Submit
                </Button>
            </form>
        </>
    );
};
export default Form;
// import React, { useState } from "react";
// import {
//     Button,
//     InputLabel,
//     NativeSelect,
//     Select,
//     TextField,
// } from "@mui/material";
// import { saveProduct } from "../services/productServices";
// import { CREATED_STATUS } from "../const/httpStatus";

// export const Form = () => {
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);
//     const [formErrors, setFormErrors] = useState({
//         name: "",
//         size: "",
//         type: "",
//     });

//     const validateField = ({ name, value }) => {
//         setFormErrors((prevState) => ({
//             ...prevState,
//             [name]: value.length ? "" : `The ${name} is required`,
//         }));
//     };

//     const validateForm = ({ name, size, type }) => {
//         validateField({ name: "name", value: name });
//         validateField({ name: "size", value: size });
//         validateField({ name: "type", value: type });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSaving(true);
//         const { name, size, type } = e.target.elements;

//         validateForm({ name: name.value, size: size.value, type: type.value });

//         const response = await saveProduct({
//             name: name.value,
//             size: size.value,
//             type: type.value,
//         });

//         if (response.status === CREATED_STATUS) {
//             setIsSuccess(true);
//         }
//         setIsSaving(false);
//     };

//     const handleBlur = (e) => {
//         const { name, value } = e.target;

//         validateField({ name, value });
//     };
//     return (
//         <>
//             <h1>Create product</h1>
//             {isSuccess && <p>product stored</p>}
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     id="name"
//                     label="name"
//                     name="name"
//                     helperText={formErrors.name}
//                     onBlur={handleBlur}
//                 ></TextField>
//                 <TextField
//                     id="size"
//                     label="size"
//                     name="size"
//                     helperText={formErrors.size}
//                     onBlur={handleBlur}
//                 ></TextField>
//                 <InputLabel variant="standard" htmlFor="type">
//                     Type
//                 </InputLabel>
//                 {/* <NativeSelect
//                     inputProps={{
//                         name: "type",
//                         id: "type",
//                     }}
//                 >
//                     <option value={"None"}></option>
//                     <option value={"electronic"}>Electronic</option>
//                     <option value={"furniture"}>Furniture</option>
//                     <option value={"clothing"}>Clothing</option>
//                 </NativeSelect> */}
//                 <Select
//                     native
//                     value=""
//                     inputProps={{
//                         name: "type",
//                         id: "type",
//                     }}
//                 >
//                     <option aria-label="None" value="" />
//                     <option value="electronic">Electronic</option>
//                     <option value="furniture">Furniture</option>
//                     <option value="clothing">Clothing</option>
//                 </Select>

//                 {formErrors.type.length && <p>{formErrors.type}</p>}

//                 <Button type="submit" disabled={isSaving}>
//                     Submit
//                 </Button>
//             </form>
//         </>
//     );
// };

// export default Form;
