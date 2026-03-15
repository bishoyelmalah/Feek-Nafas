import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export const createChatRoom = (roomId: string) => {
    const channel = supabase.channel(roomId);
    return channel;
}

export const receiveMessage = async (channel: RealtimeChannel, callback: (payload: any) => void) => {
    channel.on(
        'broadcast',
        {event: 'shout'},
        (payload) => {
            callback(payload);
        }
    ).subscribe();
}

export const sendMessage = async (channel: RealtimeChannel | null, message: string, sender: string) => {
    channel?.send({
        type: 'broadcast',
        event: 'shout',
        payload: {message, sender}
        }
    )
}