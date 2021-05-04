import { useSelector } from 'react-redux';
import { PUBLIC_USER } from '@constants/';

export default function useIsUserAuthenticated() {
  const { logged, user } = useSelector((state) => state.auth);

  const isPublic = user?.email === PUBLIC_USER.email;

  return logged && !isPublic;
}
