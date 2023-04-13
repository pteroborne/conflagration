import { supabase } from '$lib/supabaseClient';

export async function post({ body }) {
    const { image } = JSON.parse(body);
    const file = image.split(';base64,').pop();
    const fileBuffer = Buffer.from(file, 'base64');

    const fileName = `uploads/${Date.now()}.png`; // You can customize the file name and extension

    const { error } = await supabase.storage
        .from('your-storage-bucket-name')
        .upload(fileName, fileBuffer, { contentType: 'image/png' });

    if (error) {
        return {
            status: 500,
            body: JSON.stringify({ success: false, message: error.message }),
        };
    }

    const fileUrl = `/uploads/${fileName}`;
    return {
        status: 200,
        body: JSON.stringify({ success: true, fileUrl }),
    };
}
