import { PUBLIC_USER } from '@constants/';
import { useSelector } from 'react-redux';

export function useUserCanSeeContent() {
  const { logged, user } = useSelector((state) => state.auth);

  const isPublic = user?.email === PUBLIC_USER.email;

  return logged || isPublic;
}

export default useUserCanSeeContent;
