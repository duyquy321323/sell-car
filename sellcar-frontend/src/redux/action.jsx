const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

export const logoutAction = () => {
    return {
        type: LOGOUT,
    }
}

export const loginAction = (user) => {
    return {
        type: LOGIN_SUCCESS,
        data: user,
    }
}

export const accountReducer = (state = null, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            {
                localStorage.setItem("userData", JSON.stringify(action.data));
                return action.data;
            }
        case LOGOUT:
            {
                localStorage.removeItem("userData");
                return null;
            }
        default:
            return state
    }
}