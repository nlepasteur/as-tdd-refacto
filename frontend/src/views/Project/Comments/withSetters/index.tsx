const comment =
  (successCallback: (comment: Comment) => void) =>
  async (arg: { commentable_id: string; text: string }) => {
    try {
      const response = await fetch('/comments', {
        method: 'POST',
        body: JSON.stringify(arg),
      });
      const comment = (await response.json()) as Comment;
      successCallback(comment);
    } catch (e) {
      // handle error
    }
  };

const editComment =
  (successCallback: (comment: Comment) => void) =>
  async (arg: { commentable_id: string; text: string }) => {
    try {
      const response = await fetch('/comments', {
        method: 'PATCH',
        body: JSON.stringify(arg),
      });
      const comment = (await response.json()) as Comment;
      successCallback(comment);
    } catch (e) {
      // handle error
    }
  };

const deleteComment =
  (successCallback: (comment: Comment) => void) =>
  async (arg: { commentable_id: string; text: string }) => {
    try {
      const response = await fetch('/comments', {
        method: 'PATCH',
        body: JSON.stringify(arg),
      });
      const comment = (await response.json()) as Comment;
      successCallback(comment);
    } catch (e) {
      // handle error
    }
  };
