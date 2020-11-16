import React, { createContext, useReducer } from "react";
import { userReducer, initialState } from "./reducer";

export const StoreContext = createContext();

export const StoreContextProvider = (props) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	return (
		<StoreContext.Provider value={[state, dispatch]}>
			{props.children}
		</StoreContext.Provider>
	);
};
