// src/context/app-context.ts
import { createContext, useContext } from "react";
import type { AppState, AppAction } from "../config/types";

// This interface describes exactly what data lives inside our global context.
// Any component that calls useAppContext() will get an object matching this shape.
interface AppContextType {
	state: AppState; // the entire app-wide state (products, cart, wishlist, etc.)
	dispatch: React.Dispatch<AppAction>; // React.Dispatch<AppAction> means this function only accepts valid AppAction objects, keeping state changes type-safe
}

// createContext creates a new React Context object that components can subscribe to.
// We type it as <AppContextType | undefined> so TypeScript knows it starts with no value
// until the Provider wraps the component tree and supplies the real value.
export const AppContext = createContext<AppContextType | undefined>(undefined);

// This custom hook wraps useContext so every component gets a clean, one-line API.
// It is a plain function (not a component), so it is safe for React Fast Refresh
// — Fast Refresh only reloads React components, not plain functions.
export const useAppContext = () => {
	// useContext reads the current value from the nearest AppContext.Provider above this component in the tree
	const context = useContext(AppContext);

	// Guard: if context is still undefined it means this hook was called outside of
	// an <AppProvider> wrapper, which is always a developer mistake — fail loudly so
	// the bug is caught immediately instead of causing silent, hard-to-trace errors.
	if (context === undefined) {
		throw new Error("useAppContext must be used within an AppProvider");
	}

	// Return the validated context so callers can destructure { state, dispatch } directly
	return context;
};
