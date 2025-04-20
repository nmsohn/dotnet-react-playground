import { FieldValues, useController, UseControllerProps } from "react-hook-form"
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker"

type Props<T extends FieldValues> = {} & UseControllerProps<T> & DateTimePickerProps

export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props })

    return (
        <DateTimePicker
            {...props}
            {...field}
            value={field.value ? new Date(field.value) : null}
            onChange={(newValue) => {
                field.onChange(new Date(newValue!))
            }}
            sx={{
                width: "100%",
            }}
            slotProps={{
                textField: {
                    onBlur: field.onBlur,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                }
            }}
        />
    )
}
