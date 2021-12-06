// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithSetters } from '../withSetters';
// components

const CommentsList: ComponentType<PropsFromWithSetters> = ({
  comments,
  ...rest
}) => (
  <>
    {comments.length ? (
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <button
              onClick={() =>
                rest.like({
                  page: 1,
                  type: 'like',
                  votable_id: comment.id,
                  votable_type: 'like',
                })
              }
            >
              like
            </button>
          </li>
        ))}
      </ul>
    ) : null}
  </>
);

export default CommentsList;
