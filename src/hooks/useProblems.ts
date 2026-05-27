import { useContext } from "react";
import { ProblemsContext } from "../contexts/ProblemsContext/ProblemsContext";

export const useProblems = () => {
    const context = useContext(ProblemsContext);
    if (context === undefined) {
        throw new Error('useProblems must be used within a ProblemsContextProvider');
    }
    return context;
};
