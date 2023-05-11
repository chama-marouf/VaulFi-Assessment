import React from "react"
import { TextField, TextFieldProps } from "@mui/material"

interface FormFieldProps extends TextFieldProps {
    errorText?: string
}

const FormField: React.FC<FormFieldProps> = ({ errorText, ...props }) => (
    <div style={{ marginBottom: "1rem" }}>
        <TextField
            {...props}
            fullWidth
            error={!!errorText}
            helperText={errorText}
        />
    </div>
)

export default FormField
