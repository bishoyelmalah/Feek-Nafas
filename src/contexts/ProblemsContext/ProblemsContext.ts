import { createContext } from "react";
import { type CodeforcesProblem } from "../../types/CodeforcesProblem";

export interface ProblemsContextType {
    problems: CodeforcesProblem[];
    loading: boolean;
    error: string | null;
}

export const ProblemsContext = createContext<ProblemsContextType | undefined>(undefined);
