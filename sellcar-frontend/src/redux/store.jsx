import { combineReducers, createStore } from "redux";
import { accountReducer } from "./action";

const allReducers = combineReducers({
    accountReducer,
})


// hàm lưu người dùng lên localstorage
function saveUserData(state) {
    try {
        if (state.accountReducer) {
            localStorage.setItem("userData", JSON.stringify(state.accountReducer));
        } else {
            localStorage.removeItem("userData"); // Xóa dữ liệu nếu logout
        }
    } catch (e) {
        console.error(e);
    }
}

// hàm tải người dùng về từ localStorage
function loadUserData() {
    try {
        const userData = localStorage.getItem("userData");
        if (userData) {
            return { accountReducer: JSON.parse(userData) }; // Đảm bảo trả về đúng cấu trúc
        }
        return undefined;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}


const prevState = loadUserData();

const store = createStore(allReducers, prevState);
store.subscribe(() => saveUserData(store.getState()))
export default store;