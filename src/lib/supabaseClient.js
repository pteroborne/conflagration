// supabaseClient.js
import {createClient} from '@supabase/supabase-js';

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

// supabaseClient.js
export async function subscribe(tableName, filters, onUpdate) {
    return supabase
        .channel('custom-filter-channel')
        .on(
            'postgres_changes',
            filters,
            (payload) => {
                console.log('Received Payload', payload)
                onUpdate(payload.new, payload.eventType);
            }
        )
        .subscribe();
}



