// src/context/AppContext.ts
import { createContext, useContext } from "react";
import type { AppState, AppAction } from "../config/types";

// Define the shape of the Context data
interface AppContextType {
	state: AppState;
	dispatch: React.Dispatch<AppAction>;
}

// Create the Context (exported for the Provider to use)
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Create and export the custom hook (safe for Fast Refresh because it's not a Component)
export const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
};

/*
IMPORTANT NOTE FROM ABD

Vite uses a feature called React Fast Refresh to instantly update your UI in the browser
without reloading the page when you save a file. 
However, Fast Refresh gets confused if a single file EXPORTS both React Components (like AppProvider) 
and regular JavaScript functions/variables (like the useAppContext hook).
we need to split the file into two: one for the Context/Hook, and one for the Provider Component.
this rule is only about exports, not imports
*/
