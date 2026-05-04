import { useState, type ReactNode } from "react";
import { OpponentContext } from "./OpponentContext";
import { type User } from "../../types/UserData";

export const OpponentContextProvider = ({children}: {children: ReactNode}) => {
    const [opponentData, setOpponentData] = useState<User | null>(null);
    return <OpponentContext.Provider value={{opponentData, setOpponentData}}>
            {children}
        </OpponentContext.Provider>
}