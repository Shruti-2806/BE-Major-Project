import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
	const backendUrl = "http://localhost:3000";

	const value = {};

	return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
