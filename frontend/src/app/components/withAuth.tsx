import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '../../context/UserContext';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
      if (!user) {
        const returnUrl = window.location.pathname + window.location.search;
        router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
      }
    }, [user, router]);

    if (user) {
      return <WrappedComponent {...props} />;
    }

    return <div>Loading...</div>;
  };

  return AuthComponent;
};

export default withAuth;
