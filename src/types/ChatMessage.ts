export interface ChatMessage {
    id?: string,
    match_id: string,
    sender_id: string,
    content: string,
    created_at?: string
};