import { supabase } from "$lib/supabaseClient.js";

export async function fetchSkills() {
    try {
        const { data, error } = await supabase.from('Skills').select('*');
        if (error) {
            console.error('Error fetching skills:', error);
            return [];
        }
        return data;
    } catch (err) {
        console.error('Error in fetchSkills:', err);
        return [];
    }
}
