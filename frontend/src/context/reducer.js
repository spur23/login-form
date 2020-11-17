import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from "./constants/userConstants";

const userFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

export const initialState = {
	user: { userInfo: userFromStorage, loading: false, error: "" },
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			// do something with the action
			return {
				...state,
				user: {
					...state.user,
					loading: true,
				},
			};
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				user: {
					...state.user,
					userInfo: {
						_id: action.payload._id,
						nameFirst: action.payload.nameFirst,
						nameLast: action.payload.nameLast,
						email: action.payload.email,
						token: action.payload.token,
					},
					loading: false,
					error: "",
				},
			};
		case USER_LOGIN_FAIL:
			return {
				...state,
				user: {
					...state.user,
					error: action.payload,
					loading: false,
				},
			};
		case USER_LOGOUT_SUCCESS:
			return {
				...state,
				user: {
					...state.user,
					userInfo: null,
				},
			};
		case USER_REGISTER_REQUEST:
			return {
				...state,
				user: {
					...state.user,
					loading: true,
				},
			};
		case USER_REGISTER_SUCCESS:
			return {
				...state,
				user: {
					...state.user,
					loading: false,
				},
			};
		case USER_REGISTER_FAIL:
			return {
				...state,
				user: {
					...state.user,
					error: action.payload,
					loading: false,
				},
			};
		default:
			return state;
	}
};
