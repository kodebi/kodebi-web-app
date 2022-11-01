import * as React from 'react';
import { LayoutContext } from '../../context/LayoutContext';
import { Alert, ImageUploader, Form, Loading2, Title } from '../../components';
import { motion } from 'framer-motion';
import { genres, languages, conditions, status } from '../../utils/dropdown';
import useBookUpload from '../../hooks/useBookUpload';
import { Box, Button, Input, Dropdown } from '@kodebi/libkodebi-ui';
import { LayoutState } from '../../@types/layout';

export const UploadBook: React.FC = (): JSX.Element => {
	const { loading, alert, closeSubmenu } = React.useContext(
		LayoutContext
	) as LayoutState;
	const {
		state: { newBook, bookImage },
		functions: { textChange, imageChange, startUpload, resetInput },
	} = useBookUpload();

	return (
		<>
			{loading && <Loading2 />}
			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.25 }}
				onClick={closeSubmenu}
			>
				<Title content="Buch hochladen" />
				<Form className="book-form" onSubmit={startUpload}>
					<ImageUploader bookImage={bookImage} imageChange={imageChange} />
					<Box variant="flex-col" padding="0">
						<Input
							label
							type="text"
							labelTag="Name"
							id="name"
							name="name"
							placeholder="Name des Buches"
							position="above"
							value={newBook.name}
							onChange={textChange}
						/>
						<Input
							label
							type="text"
							labelTag="Autor*in"
							id="author"
							name="author"
							placeholder="Autor*in des Buches"
							position="above"
							value={newBook.author}
							onChange={textChange}
						/>
						<Dropdown
							label
							position="above"
							labelTag="Genre"
							id="category"
							name="category"
							options={genres}
							value={newBook.category}
							onChange={textChange}
						/>
						<Dropdown
							label
							position="above"
							labelTag="Sprache"
							id="language"
							name="language"
							options={languages}
							value={newBook.language}
							onChange={textChange}
						/>
						<Dropdown
							label
							position="above"
							labelTag="Zustand"
							id="condition"
							name="condition"
							options={conditions}
							value={newBook.condition}
							onChange={textChange}
						/>
						<Dropdown
							label
							position="above"
							labelTag="Status"
							id="status"
							name="status"
							options={status}
							value={newBook.status}
							onChange={textChange}
						/>
						<Input
							label
							labelTag="Beschreibung"
							id="description"
							name="description"
							textarea
							rows={4}
							placeholder="Kurze Beschreibung des Buches"
							position="above"
							value={newBook.description}
							onChange={textChange}
						/>
						<Box variant="flex-col" padding="0" margin="1rem 0">
							<Button
								variant="action"
								type="submit"
								margin="0.25rem 0.75rem"
								label="Hochladen"
							/>
							<Button
								variant="action"
								type="reset"
								margin="0.25rem 0.75rem"
								onClick={resetInput}
								label="Löschen"
							/>
						</Box>
					</Box>
				</Form>
				{alert.display && <Alert />}
			</motion.main>
		</>
	);
};
