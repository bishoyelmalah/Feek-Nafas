export interface User {
    id: string,
    name: string,
    username: string,
    email: string,
    codeforces_handle: string,
    score: number,
    created_at?: string,
    updated_at?: string,
    avatar_url?: string,
    rank?: number,
    totalMatches?: number,
    wins?: number
}