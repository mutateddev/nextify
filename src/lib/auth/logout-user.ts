import { supabase } from '../supabase-client';

const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      type: 'error',
      text: error.message,
    };
  }

  return {
    type: 'success',
    text: 'Logged out successfully',
  };
};

export default logoutUser;
