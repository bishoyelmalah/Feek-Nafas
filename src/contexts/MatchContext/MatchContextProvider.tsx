import { createMatch } from "../../services/matchService";
import type { CreateMatchData } from "../../types/CreateMatchData";
import type { MatchData } from "../../types/MatchData";
import { MatchContext } from "./MatchContext";
import { useEffect, useState, type ReactNode } from "react";

export const MatchContestProvider = ({creationData, children }: { creationData: CreateMatchData ,children: ReactNode }) => {
    const [matchData, setMatchData] = useState<MatchData | null>(null);

    useEffect(() => {
        const handleCreation = async () => {
            const data = await createMatch(creationData); 
            setMatchData(data);
        }
        handleCreation();
    })



    return (
        <MatchContext.Provider value={matchData}>
            {children}
        </MatchContext.Provider>
    )
}