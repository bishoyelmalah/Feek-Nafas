import { useState, useEffect, type ReactNode } from "react";
import { OpponentContext } from "./OpponentContext";
import { type User } from "../../types/UserData";

export const OpponentContextProvider = ({children}: {children: ReactNode}) => {
    const [opponentData, setOpponentData] = useState<User | null>(() => {
        const savedOpponentData = localStorage.getItem('opponent_data');
        return savedOpponentData ? JSON.parse(savedOpponentData) : null;
    });

    useEffect(() => {
        if (opponentData) {
            localStorage.setItem('opponent_data', JSON.stringify(opponentData));
        } else {
            localStorage.removeItem('opponent_data');
        }
    }, [opponentData]);

    return <OpponentContext.Provider value={{opponentData, setOpponentData}}>
            {children}
        </OpponentContext.Provider>
}