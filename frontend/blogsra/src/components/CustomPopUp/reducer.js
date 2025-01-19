export const initialState = {
    pass: "",
    errorMsg: "",
    loading: false, 
};

export default function reducer(state, action) {
    switch (action.type) {
        case "SET PASS":
            return {
                ...state,
                pass: action.payload.pass,
            };

        case "MINIMUM 6":
            return {
                ...state,
                errorMsg: "Password is 6 characters at least",
            };

        case "VERIFY PASSWORD":
            return {
                ...state,
                errorMsg: "Processing...",
                loading: true,
            };

        case "INVALID PASSWORD":
            return {
                ...state,
                errorMsg: "Invalid Password",
                loading: false,
            };

        case "SHOULD DELETE":
            return {
                ...state,
                errorMsg: "Successfully Deleted",
                loading: false,
            };

        default:
            return state;
    }
}
