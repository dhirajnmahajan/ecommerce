import api from "./createApi";

export const getProducts = async () => {
    try {
        const res = await api.get('/products')
        console.log(res.data);

        return res.data;
    } catch (error) {
        throw new error;
    }
}

export const addProduct = async (productData) => {
    try {
        const res = await api.post('/products', productData)
        return res.data;
    } catch (error) {
        console.log('error at adding product', error);
        throw new error;
    }
}

export const updateProduct = async (id, productData) => {
    try {
        const res = await api.patch(`/products/${id}`, productData)
        return res.data;
    } catch (error) {
        console.log('error at updating product', error);
        throw new error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await api.delete(`/products/${id}`)
        return res.data
    } catch (error) {
        console.log('error while deleting product', error);
        throw new error

    }
}