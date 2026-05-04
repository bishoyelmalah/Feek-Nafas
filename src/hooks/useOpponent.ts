import { OpponentContext } from "../contexts/OpponentContext/OpponentContext";
import { useContext } from "react";

export const useOpponent = () => {
    const context = useContext(OpponentContext);
    // console.log(context?.opponentData);
    if (context === undefined) {
        throw new Error('useOpponent must be used within an OpponentContextProvider');
    }
    return context;
};