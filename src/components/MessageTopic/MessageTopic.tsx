import * as React from 'react';
import { Button } from '@kodebi/libkodebi-ui';

export const MessageTopic = ({ requestingUser, bookName, lendBook }) => {
	return (
		<>
			<article className="topic-box">
				<header className="topic-wrapper">
					<h4 className="title">
						<u>{requestingUser}</u> hat Interesse an <u>{bookName}</u>
					</h4>
					<p className="topic-body">Jetzt verleihen?</p>
				</header>
				<Button variant="signin" onClick={lendBook} label="Bestätigen" />
			</article>
		</>
	);
};
