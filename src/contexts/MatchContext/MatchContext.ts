import { createContext } from "react";
import type { MatchData } from "../../types/MatchData";

export const MatchContext = createContext<{
    matchData: MatchData | null;
    setMatchData: (matchData: MatchData | null) => void;
} | null>(null);