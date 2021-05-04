import { PUBLIC_USER } from '@constants/';
import { useSelector } from 'react-redux';

export function useUserIsPublic() {
  const { user } = useSelector((state) => state.auth);

  const isPublic = user?.email === PUBLIC_USER.email;

  return isPublic;
}

export default useUserIsPublic;
