// // types
// import { FetchState } from '@types';
// import { Comment } from 'views/Artwork/Comments/withComments';
// // tested setters
// import { updateCommentLikes } from 'views/Artwork/Comments/withComments';

// const stubCommentBase = {
//   child_comments: [],
//   commentable_id: '',
//   created_at: '',
//   hidden_by_user: false,
//   parent_id: '',
//   text: '',
//   text_as_html: '',
//   user: {
//     small_cover_url: '',
//     medium_avatar_url: '',
//     is_plus_member: false,
//     is_school_account: false,
//     is_staff: false,
//     is_studio_account: false,
//     pro_member: false,
//     full_name: '',
//     username: '',
//     id: '',
//     blocked: false,
//     followed: false,
//     following_back: false,
//     headline: '',
//     large_avatar_url: '',
//     permalink: '',
//   },
//   user_id: '',
// };

// describe('Comments setters', () => {
//   describe('like', () => {
//     describe('"UPDATE_LIKES" action type', () => {
//       describe('comment "0" is not already liked', () => {
//         it('returns comment "0" with "liked" false and "likes_count" incremented by 1', () => {
//           const stubComments: Comment[] = [...Array(10)].map((_, i) => ({
//             liked: false, // doit devenir true
//             likes_count: 0, // doit être incrémenté
//             id: String(i),
//             ...stubCommentBase,
//           }));
//           const stubUpdatedCommentId = '0';
//           const stubCommentsFetchState: FetchState<Comment> = {
//             status: 'success',
//             error: null,
//             data: stubComments,
//           };
//           const result = updateCommentLikes(
//             stubCommentsFetchState,
//             stubUpdatedCommentId
//           );
//           const expected = [
//             {
//               ...stubComments[0],
//               liked: !stubComments[0].liked,
//               likes_count: stubComments[0].likes_count + 1,
//             },
//             ...stubComments.slice(1),
//           ];
//           const x = result.data.find((comment) => comment.id === '0');
//           expect(x).toEqual(expected[0]);
//         });
//       });
//     });
//   });
// });
