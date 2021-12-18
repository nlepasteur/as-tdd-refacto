// types
import type { ComponentType } from 'react';
// libs
import classnames from 'classnames';
// components
import Btn from 'components/Btn';

export type InjectedProps = {
  isLogged: boolean;
  user: {
    id: string;
    followed: boolean;
  };
  follow(arg: { followee_id: string }): Promise<void>;
  toggleSignupSigninModal(): void;
};

const Button: ComponentType<InjectedProps> = ({
  isLogged,
  user: { id, followed },
  toggleSignupSigninModal,
  follow,
}) => (
  <Btn
    className={classnames('follow-btn', followed && 'follow-btn--followed')}
    onClick={() =>
      isLogged ? follow({ followee_id: id }) : toggleSignupSigninModal()
    }
  >
    {{
      text: followed ? 'Following' : 'Follow',
    }}
  </Btn>
);

export default Button;
