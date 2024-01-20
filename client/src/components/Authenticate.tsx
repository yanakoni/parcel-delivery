import { JSX } from 'react';
import { keycloak } from '../consts';
import { Loader } from './Loader';

export const Authenticate = ({ children }: { children: JSX.Element }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const userData = await keycloak.loadUserInfo();
      setUserData(userData);
    })();
  }, []);

  if (!userData) return <Loader type="fullscreen" />;

  return children;
};
