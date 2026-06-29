import { supabase } from '../supabase-client';

const signupUser = async (name: string, email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      console.log('signup error: ', error.message);
      return { type: 'error', text: error.message };
    }
  } catch (err) {
    console.log('unexpected err:', err);
    return { type: 'error', text: `something went wrong!` };
  }
};

export default signupUser;
