import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://soymnexyrqxgydmgazns.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNveW1uZXh5cnF4Z3lkbWdhem5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3ODg5NjUsImV4cCI6MjA3ODM2NDk2NX0.ZHqRexzv37Z69JflV-DgguFtsRLA86Q36B2W0A2zecE';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
