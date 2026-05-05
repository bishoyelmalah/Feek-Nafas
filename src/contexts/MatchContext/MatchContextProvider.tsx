import type { MatchData } from "../../types/MatchData";
import { MatchContext } from "./MatchContext";
import { useState, useEffect, type ReactNode } from "react";

export const MatchContestProvider = ({ children }: { children: ReactNode }) => {
    const [matchData, setMatchData] = useState<MatchData | null>(() => {
        const savedMatchData = localStorage.getItem('match_data');
        return savedMatchData ? JSON.parse(savedMatchData) : null;
    });

    useEffect(() => {
        if (matchData) {
            localStorage.setItem('match_data', JSON.stringify(matchData));
        } else {
            localStorage.removeItem('match_data');
        }
    }, [matchData]);

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