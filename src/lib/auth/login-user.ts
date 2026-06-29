import { supabase } from '../supabase-client';

const loginUser = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('login error', error);
      return { type: 'error', text: 'Invalid email or password' };
    }

    return { type: 'success', text: 'login successful.' };
  } catch (error) {
    console.log('login error', error);
    return { type: 'error', text: 'something went wrong!' };
  }
};

export default loginUser;
