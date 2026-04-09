const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkReviews() {
    const { data, error } = await supabase
        .from('Reviews')
        .select('*');
    
    if (error) {
        console.error('Error:', error);
        return;
    }
    
    console.log('Total Reviews:', data.length);
    data.forEach(r => {
        console.log(`ID: ${r.id}, Page: ${r.page}, Name: ${r.name}`);
    });
}

checkReviews();
