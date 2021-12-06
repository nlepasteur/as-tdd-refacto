// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithPopUpErrors } from './withPopUpErrors';
// components
import withPopUpErrors, { connector } from './withPopUpErrors';
import PopUpError from './PopUpError';
// style
import './PopUpErrors.css';

export type InjectedProps = PropsFromWithPopUpErrors;

const PopUpErrors: ComponentType<InjectedProps> = ({
  popUpErrors,
  removePopUpError,
}) => (
  <>
    {popUpErrors.length ? (
      <ul className="pop-up-errors-list">
        {popUpErrors
          .map((popUpError) => (
            <li key={popUpError.id}>
              <PopUpError {...popUpError} removePopUpError={removePopUpError} />
            </li>
          ))
          .reverse()}
      </ul>
    ) : null}
  </>
);

export default connector(withPopUpErrors(PopUpErrors));
