import { Controller } from "react-hook-form";
import convertImage from "../../utils/convertImage";

export default function RHFImageUpload(control, name, ...other) {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={(field) => (
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return

                            const convertedImage = await convertImage(file);
                            field.onChange(convertedImage)
                        }}
                        {...other}
                    />
                )}
            />
        </>
    )
}