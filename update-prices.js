const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('products').update({ price: 10 }).neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) {
    console.error("Error updating prices:", error);
  } else {
    console.log("Successfully updated all product prices to 10 ZAR!");
  }
}

main();
