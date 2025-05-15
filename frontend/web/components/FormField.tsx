"use client"

import React from "react"
import {
    TextField,
    TextFieldProps,
    InputAdornment,
    IconButton,
} from "@mui/material"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"

export interface FormFieldProps extends Omit<TextFieldProps, "variant"> {
    errorText?: string
}

const FormField: React.FC<FormFieldProps> = ({ errorText, ...props }) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show)
    }

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    const isPasswordField = props.type === "password"

    return (
        <TextField
            {...props}
            variant='outlined'
            fullWidth
            margin='normal'
            error={!!errorText}
            helperText={errorText}
            InputProps={{
                endAdornment: isPasswordField ? (
                    <InputAdornment position='end'>
                        <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'>
                            {showPassword ? (
                                <VisibilityOffOutlined />
                            ) : (
                                <VisibilityOutlined />
                            )}
                        </IconButton>
                    </InputAdornment>
                ) : null,
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "60px",
                    fontFamily: "Inter, sans-serif",
                    "& fieldset": {
                        borderColor: "#E0E0E0",
                    },
                    "&:hover fieldset": {
                        borderColor: "#BDBDBD",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#0B045D",
                    },
                },
                "& .MuiInputLabel-root": {
                    color: "#757575",
                    fontFamily: "Inter, sans-serif",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0B045D",
                },
                "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                    fontFamily: "Inter, sans-serif",
                },
            }}
        />
    )
}

export default FormField
