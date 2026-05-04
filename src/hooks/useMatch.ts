import { useContext } from "react";
import { MatchContext } from "../contexts/MatchContext/MatchContext";

export const useMatch = () => {
    const context = useContext(MatchContext);
    if (context === null) {
        throw Error("You can't use the useMatch outside the MatchContextProvider");
    }
    return context;
}