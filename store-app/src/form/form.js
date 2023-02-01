import React from "react";
import { Button, InputLabel, NativeSelect, TextField } from "@mui/material";

export const Form = () => {
    return (
        <>
            <h1>Create product</h1>
            <form>
                <TextField id="name" label="name"></TextField>
                <TextField id="size" label="size"></TextField>
                <InputLabel variant="standard" htmlFor="type">
                    Type
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    inputProps={{
                        name: "type",
                        id: "type",
                    }}
                >
                    <option value={10}>Electronic</option>
                    <option value={20}>Furniture</option>
                    <option value={30}>Clothing</option>
                </NativeSelect>

                <Button>Submit</Button>
            </form>
        </>
    );
};

export default Form;
