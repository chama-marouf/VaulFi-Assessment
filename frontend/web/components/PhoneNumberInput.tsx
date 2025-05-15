import React from "react"
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"
import "react-phone-number-input/style.css"
import { useController, useFormContext } from "react-hook-form"

interface PhoneNumberInputProps {
    name: string
    label: string
    errorText?: string
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
    name,
    label,
    errorText,
}) => {
    const { control } = useFormContext()
    const { field } = useController({
        name,
        control,
        rules: { required: errorText ? true : false },
    })

    return (
        <div className='phone-input-wrapper'>
            <label>{label}</label>
            <PhoneInputWithCountry
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                inputRef={field.ref}
                defaultCountry='DZ'
                className='custom-phone-input'
                // Add other props as needed for styling or functionality
            />
            {errorText && <p className='error-text'>{errorText}</p>}
        </div>
    )
}

export default PhoneNumberInput
