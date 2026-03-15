export interface ChatMessage {
    id: number;
    sender: 'you' | 'opponent' | 'system';
    text: string;
    time: string;
};