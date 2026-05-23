import { useState, useEffect, type ReactNode } from 'react';
import { ProblemsContext } from './ProblemsContext';
import { type CodeforcesProblem } from '../../types/CodeforcesProblem';
import { getAllProblems } from '../../services/codeforcesService';
import { useAuth } from '../../hooks/useAuth';

export const ProblemsContextProvider = ({ children }: { children: ReactNode }) => {
    const [problems, setProblems] = useState<CodeforcesProblem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { session } = useAuth();

    useEffect(() => {
        const fetchProblems = async () => {
            if (!session) {
                setProblems([]);
                return;
            }

            // Only fetch if we don't have problems yet
            if (problems.length > 0) return;

            setLoading(true);
            setError(null);
            try {
                const data = await getAllProblems();
                if (data) {
                    setProblems(data);
                } else {
                    setError('Failed to fetch problems');
                }
            } catch (err) {
                setError('An error occurred while fetching problems');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, [session]);

    return (
        <ProblemsContext.Provider value={{ problems, loading, error }}>
            {children}
        </ProblemsContext.Provider>
    );
};
