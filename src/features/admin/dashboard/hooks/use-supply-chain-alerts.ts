import { useMemo } from "react";
import { useAppContext } from "../../../../context/app-context";
import { SCNode } from "../../../../config/types";

export function useSupplyChainAlerts() {
	const { state } = useAppContext();

	const alerts: SCNode[] = useMemo(() => state.supplyChainNodes.filter(
		(n) => n.data.status === "DELAYED" || n.data.status === "CRITICAL"
	), [state.supplyChainNodes]);

	return { alerts };
}
