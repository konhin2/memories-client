const reducer = (globalState, action) => {
    switch (action.type) {
        case "GET_LIKES":
            return {
                ...globalState,
                likes: action.payload
            }
        default:
            return globalState;
    }
}
export default reducer