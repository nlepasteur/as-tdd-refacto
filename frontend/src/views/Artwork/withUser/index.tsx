// types
import { ComponentType, useEffect } from 'react';
// libs
import { useState } from 'react';

type InjectedProps = { user: object };

type OwnProps = { artworkId: string };

const withUser = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithUser = ({ artworkId }: OwnProps) => {
    const [user, setUser] = useState<null | InjectedProps['user']>(null);
    const fetchUserData = async (artworkId: string) => {
      try {
        const response = await fetch('');
        const data = await response.json();
        setUser(data);
      } catch (e) {
        //
      }
    };
    useEffect(() => {
      fetchUserData(artworkId);
    }, [artworkId]);
    return <UnwrappedComponent user={user} />;
  };
  return WithUser;
};
