import { useEffect, useState } from "react";
import { AuthContext } from "./createAuthContext";

export default function authProvider({ children }) {
    const initialData = {
        name: '',
        email: '',
        mobile: '',
        address: '',
        password: '',
    }

    const [user, setUser] = useState(initialData);
    const [authenticated, setAuthenticated] = useState(false);

    const me = () => {

    }
    const initialize = () => {
        me();
    }

    // initialize me call
    useEffect(() => {
        initialize();
    }, [])

    // register user
    function registerUser(formdata) {

    }

    // login
    function loginUser(formdata) {

    }

    // logout function
    function logoutUser() {

    }

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}