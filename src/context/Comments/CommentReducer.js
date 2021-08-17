const reducer = (globalState, action) => {
    switch (action.type) {
        case "GET_COMMENTS":
            return {
                ...globalState,
                comments: action.payload
            }
        default:
            return globalState;
    }
}
export default reducer