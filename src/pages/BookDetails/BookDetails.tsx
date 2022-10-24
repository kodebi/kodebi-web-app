import * as React from 'react';
import {
	Loading,
	UserAction,
	Alert,
	ReturnTo,
	MessageModal,
	Loading2,
	EditBook,
} from '../../components';
import { motion } from 'framer-motion';
import { LayoutContext } from '../../context/LayoutContext';
import useBookDetails from '../../hooks/useBookDetails';
import useStartConversations from '../../hooks/useStartConversations';

export const BookDetails = () => {
	const { alert, closeSubmenu, loading } = React.useContext(LayoutContext);
	const {
		state: { book, showEditBook },
		functions: {
			openEditWindow,
			closeEditWindow,
			changeBookDetails,
			updateBookDetails,
			deleteBook,
		},
	} = useBookDetails();
	const {
		state: { newConv, showMessageModal },
		functions: { closeMessageModal, messageUser, msgModalInput, startConv },
	} = useStartConversations(book.ownerId, book.ownerName, book._id, book.name);

	if (loading) return <Loading />;
	return (
		<>
			{showMessageModal && (
				<MessageModal
					closeMessageModal={closeMessageModal}
					msgModalInput={msgModalInput}
					startConv={startConv}
					showMessageModal={showMessageModal}
					newConv={newConv}
				/>
			)}
			{showEditBook && (
				<EditBook
					book={book}
					changeBookDetails={changeBookDetails}
					updateBookDetails={updateBookDetails}
					closeEditWindow={closeEditWindow}
				/>
			)}
			{loading && <Loading2 />}
			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.25 }}
				onClick={closeSubmenu}
			>
				<ReturnTo />
				<article className="open-book">
					<img src={book.image} alt={book.name} />
					<section className="open-book-info">
						<div>
							<h2 className="title">{book.name}</h2>
							<h4 className="title">{book.author}</h4>
						</div>
						<hr className="separation-line" />
						<div>
							<h4>Genre</h4>
							<p>{book.category}</p>
						</div>
						<div>
							<h4>Sprache</h4>
							<p>{book.language}</p>
						</div>
						<div>
							<h4>Beschreibung</h4>
							<p>{book.description}</p>
						</div>
					</section>
					<UserAction
						book={book}
						deleteBook={deleteBook}
						openEditWindow={openEditWindow}
						messageUser={messageUser}
					/>
				</article>
				{alert.display && <Alert />}
			</motion.main>
		</>
	);
};
