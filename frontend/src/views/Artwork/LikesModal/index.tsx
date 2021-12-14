// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithLikes } from './withLikes';
// libs
import { useRef, useLayoutEffect, createRef } from 'react';
import gsap from 'gsap';
// hooks
import useOnClickOutside from 'hooks/useOnClickOutside';
// components
import Modal from 'components/Modal';
import withLikes from './withLikes';
import Like from './Like';
import { CgClose } from 'react-icons/cg';
// style
import './LikesModal.css';

type InjectedProps = PropsFromWithLikes;

// const LikesModal: ComponentType<InjectedProps> = ({
//   likes,
//   toggleLikesModal,
// }) => {
//   const modal = useRef(null);
//   const timeline = useRef<gsap.core.Timeline | null>(null);
//   const handleCloseLikesModal = () => {
//     if (timeline.current) {
//       timeline.current.reverse().then(() => toggleLikesModal());
//     }
//   };

//   useOnClickOutside(modal, handleCloseLikesModal);
//   useLayoutEffect(() => {
//     timeline.current = gsap
//       .timeline()
//       .set(modal.current, { y: '-100%', opacity: 0 })
//       .to(modal.current, {
//         y: '0',
//         top: '5vh',
//         duration: 0.5,
//         opacity: 1,
//       });
//   }, []);

//   return (
//     <div className="modal-background">
//       <div ref={modal} className="modal">
//         <div className="modal__header">
//           <div>People Who Like This</div>
//           <button onClick={handleCloseLikesModal}>
//             <CgClose />
//           </button>
//         </div>
//         <ul className="modal__list">
//           {likes.map((like) => (
//             <li key={like.id} className="like">
//               <Like like={like} handleCloseLikesModal={handleCloseLikesModal} />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

const LikesModal: ComponentType<InjectedProps> = ({
  likes,
  toggleLikesModal,
}) => {
  const timeline = createRef<gsap.core.Timeline | null>();
  const handleCloseModal = () => {
    if (
      timeline instanceof Object &&
      'current' in timeline &&
      timeline.current
    ) {
      timeline.current.reverse().then(() => toggleLikesModal());
    }
  };
  return (
    <Modal
      handleCloseModal={handleCloseModal}
      header="People Who Like This"
      ref={timeline}
    >
      {{
        main: (
          <>
            {/* <div className="modal__header">
              <div>People Who Like This</div>
              <button onClick={toggleLikesModal}>
                <CgClose />
              </button>
            </div> */}
            <ul className="modal__list">
              {likes.map((like) => (
                <li key={like.id} className="like">
                  <Like like={like} handleCloseLikesModal={toggleLikesModal} />
                </li>
              ))}
            </ul>
          </>
        ),
      }}
    </Modal>
  );
};

export default withLikes(LikesModal);
