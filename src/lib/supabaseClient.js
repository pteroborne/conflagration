import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function subscribeToSkills(callback) {
    supabase
        .from('Skills')
        .on('*', (payload) => {
            console.log('Real-time update:', payload);
            callback(payload);
        })
        .subscribe();
}
