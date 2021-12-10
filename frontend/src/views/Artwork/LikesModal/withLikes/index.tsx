// types
import type { ComponentType } from 'react';
import type { Like } from '@types';
// libs
import { useEffect } from 'react';

type OwnProps = { votableId: string };

type State = { likes: Like[] }

type InjectedProps = State;

const initialState = {
    likes: []
}

const reducer = (state: )
const withLikes = (UnwrappedComponent: ComponentType<InjectedProps>) => {
    const WithLikes = ({ votableId }: OwnProps) => {
        
    }
    return WithLikes;
};

export default withLikes;
