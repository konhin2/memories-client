const reducer = (globalState, action) => {
    switch (action.type) {
        case "GET_IMAGE":
            return {
                ...globalState,
                image: action.payload
            }
        default:
            return globalState;
    }
}
export default reducer