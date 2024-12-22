export const initialState = {
    accountInfo: null,
    showConfirm: false,
    showTakePassword: false,
    loading: false,
};
export default function reducer(state, action) {
    switch (action.type) {
        case 'SET_ACCOUNT_INFO':
            return {
                ...state,
                accountInfo: action.payload.accountInfo,
                loading: action.payload.loading
            };
        case 'SET_SHOW_CONFIRM':
            return { ...state, showConfirm: action.payload };
        case 'SET_SHOW_TAKE_PASSWORD':
            return { ...state, showTakePassword: action.payload };
        default:
            return state;
    }
}
