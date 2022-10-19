import * as React from 'react';
import { BookCard } from '../BookCard';
import { Box, Card, Text } from '@kodebi/libkodebi-ui';

export const Shelf = ({ element, user }) => {
	return (
		<>
			{element?.length < 1 ? (
				<section className="empty-shelf">
					<div className="error-message basic-flex">
						<h3 className="title">
							Aktuell sind noch keine Bücher hochgeladen. Lade schnell welche
							hoch und biete sie zum Verleihen an!
						</h3>
					</div>
				</section>
			) : (
				<Card
					withBorders
					shadow="light"
					margin="0"
					width="100%"
					maxWidth="1180px"
				>
					<Box variant="center">
						<Text color="#d96c75" padding="0.25rem" fontSize="1.25rem">
							Bücherregal {user && `von ${user}`}
						</Text>
					</Box>
					<Box variant="shelf" padding="0.5rem">
						{element?.map((book) => {
							return <BookCard key={book._id} {...book} />;
						})}
					</Box>
				</Card>
			)}
		</>
	);
};
