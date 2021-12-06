// types
import { InjectedProps as CommentProps } from 'views/Artwork/Comments/Comment';
// libs
import { render, act, fireEvent } from '@testing-library/react';
// tested components
import Comment from 'views/Artwork/Comments/Comment';

describe('Comment', () => {
  it('displays a "like" button', () => {
    const stubInjectedProps: CommentProps = {
      isLogged: false,
      votableId: 'id',
      like: jest.fn(),
    };
    const { getByRole } = render(<Comment {...stubInjectedProps} />);
    const likeBtn = getByRole('button', { name: /^like$/i });
    expect(likeBtn).toBeInTheDocument();
  });
  describe('user is not logged', () => {
    it('if user try to like, is displayed an error message', async () => {
      const stubInjectedProps: CommentProps = {
        isLogged: false,
        votableId: 'id',
        like: jest.fn(),
      };
      const { getByRole, findByText } = render(
        <Comment {...stubInjectedProps} />
      );
      const likeBtn = getByRole('button', { name: /^like$/i });
      fireEvent.click(likeBtn);
      const errorMessage = 'you must login or register before continuing';
      await findByText(errorMessage);
      expect(errorMessage).toBeInTheDocument();
    });
    it.todo(
      'if user try see users whose liked comment, modal to signin or singup'
    );
    it.todo('reply button is not displayed');
  });
  describe('user is logged', () => {
    it.todo('can like');
    it.todo('can reply');
  });
  // if commentable is artwork no flatted else flatted
});
