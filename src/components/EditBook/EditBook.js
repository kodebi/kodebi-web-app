import React from 'react';
import { ModalWrapper } from '../ModalWrapper';
import { motion } from 'framer-motion';
import { Dropdown } from '../Dropdown';
import { genres, languages, conditions, status } from '../../utils/dropdown';
import { Box, Button, InputWrapper } from '@kodebi/libkodebi-ui';

export const EditBook = ({
	book,
	showEditBook,
	updateBookDetails,
	changeBookDetails,
	closeEditWindow,
}) => {
	return (
		<>
			<ModalWrapper showEditBook={showEditBook} onClick={closeEditWindow}>
				<motion.form
					drag
					className="book-update-form"
					onSubmit={updateBookDetails}
					onClick={(e) => e.stopPropagation()}
				>
					<Box variant="flex-col" padding="0">
						<InputWrapper
							type="text"
							htmlFor="Name:"
							name="name"
							id="name"
							placeholder="Name des Buches"
							position="above"
							value={book.name}
							onChange={changeBookDetails}
						/>
						<InputWrapper
							type="text"
							htmlFor="Autor*in:"
							name="author"
							id="author"
							placeholder="Autor*in des Buches"
							position="above"
							value={book.author}
							onChange={changeBookDetails}
						/>
						<Dropdown
							htmlFor="Genre:"
							name="category"
							id="category"
							options={genres}
							value={book.category}
							onChange={changeBookDetails}
						/>
						<Dropdown
							htmlFor="Sprache:"
							name="language"
							id="language"
							options={languages}
							value={book.language}
							onChange={changeBookDetails}
						/>
						<Dropdown
							htmlFor="Zustand:"
							name="condition"
							id="condition"
							options={conditions}
							value={book.condition}
							onChange={changeBookDetails}
						/>
						<Dropdown
							htmlFor="Status:"
							name="status"
							id="status"
							options={status}
							value={book.status}
							onChange={changeBookDetails}
						/>
						<InputWrapper
							htmlFor="Beschreibung:"
							name="description"
							id="description"
							textarea
							rows="2"
							position="above"
							placeholder="Kurze Beschreibung des Buches"
							value={book.description}
							onChange={changeBookDetails}
						/>
						<Box variant="flex-col" padding="0" margin="0.5rem 0">
							<Button
								variant="action"
								type="submit"
								label="Jetzt speichern"
								margin="0.25rem 0"
							/>
							<Button
								variant="action"
								onClick={closeEditWindow}
								label="Abbrechen"
								margin="0.25rem 0"
							/>
						</Box>
					</Box>
				</motion.form>
			</ModalWrapper>
		</>
	);
};
