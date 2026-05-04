import type { MatchData } from "../../types/MatchData";
import { MatchContext } from "./MatchContext";
import { useState, type ReactNode } from "react";

export const MatchContestProvider = ({ children }: { children: ReactNode }) => {
    const [matchData, setMatchData] = useState<MatchData | null>(null);

    // useEffect(() => {
    //     const handleCreation = async () => {
    //         const data = await createMatch(creationData); 
    //         setMatchData(data);
    //     }
    //     handleCreation();
    // })



    return (
        <MatchContext.Provider value={{matchData, setMatchData}}>
            {children}
        </MatchContext.Provider>
    )
}