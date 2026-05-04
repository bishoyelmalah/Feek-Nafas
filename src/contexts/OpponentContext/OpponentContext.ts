import { createContext } from "react";
import { type User } from "../../types/UserData";

export const OpponentContext = createContext<{
    opponentData: User | null;
    setOpponentData: (user: User | null) => void;
} | undefined>(undefined);