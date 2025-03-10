import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  global: {
    // Need this to make sure supabase uses the monkeypatched fetch implementation
    fetch: (url, options) => {
      return fetch(url as any, options);
    },
  },
});

export default supabase;
