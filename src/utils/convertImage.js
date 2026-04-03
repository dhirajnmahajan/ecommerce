export default function convertImage(file) {

    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        // console.log(reader);

        reader.onerror = () => {
            console.log('File Reader Error', reader.error);
        }
        reader.onload = () => resolve(reader.result)

    })
}