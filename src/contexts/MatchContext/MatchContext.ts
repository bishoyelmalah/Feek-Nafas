import { createContext } from "react";
import type { MatchData } from "../../types/MatchData";

export const MatchContext = createContext<MatchData | null>(null);