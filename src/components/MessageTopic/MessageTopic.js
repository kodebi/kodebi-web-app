import * as React from 'react';
import { SigninBtn } from '../SigninBtn';

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
				<SigninBtn onClick={lendBook} style={{ marginTop: 0 }}>
					Bestätigen
				</SigninBtn>
			</article>
		</>
	);
};
