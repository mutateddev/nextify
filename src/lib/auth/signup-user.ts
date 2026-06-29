import { supabase } from '../supabase-client';

const signupUser = async (name: string, email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      return {
        type: 'error',
        text: error.message,
      };
    }

    return {
      type: 'success',
      text: 'Signup successful',
    };
  } catch (err) {
    console.error(err);
    return {
      type: 'error',
      text: 'Something went wrong!',
    };
  }
};
export default signupUser;
