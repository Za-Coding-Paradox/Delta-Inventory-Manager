// src/context/app-context.ts
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
