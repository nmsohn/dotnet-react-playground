import { TextField, TextFieldProps } from "@mui/material"
import { FieldValues, useController, UseControllerProps } from "react-hook-form"

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps

export default function TextInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props })
    return (
        <TextField
            {...field}
            {...props}
            value={field.value || ""}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
            variant="outlined"
        />
    )
}
