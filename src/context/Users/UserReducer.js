const reducers = (globalState, action) => {

    switch(action.type){


        case "GET_USER_INFO":
            
            return {
                ...globalState,
                authStatus: true,
                user: action.payload
            }


        case "LOGOUT_USER":

         localStorage.removeItem("token")   

         return {
             ...globalState,
             token: null,
             user: null,
             authStatus: null
         }


        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":

            localStorage.setItem("token", action.payload.token)
            
            return {
                ...globalState,
                authStatus: true,
                token: action.payload.token
            }

        default:
            return globalState    

    }

}

export default reducers