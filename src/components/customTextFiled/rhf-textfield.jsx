import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function RHFTextfield({ control, label, name, type, ...other }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    name={name}
                    label={label}
                    error={!!error}
                    type={type}
                    helperText={error && error?.message}
                    onChange={(e) => field.onChange(e.target.value)}
                    {...other}

                />
            )}
        />
    )
}