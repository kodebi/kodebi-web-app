import * as React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { dateFormatter } from '../../helpers/dateFormatter';

export const Message = ({ message, senderName, createdAt }) => {
	const formattedDate = React.useMemo(
		() => dateFormatter(createdAt),
		[createdAt]
	);
	return (
		<>
			<article className="message basic-flex">
				<span className="user-icon basic-flex">
					<FaUserCircle />
				</span>
				<aside className="glimpse-message">
					<header className="message-header">
						<h4 className="title">{senderName}</h4>
						<p>{formattedDate}</p>
					</header>
					<p className="message-body">{message}</p>
				</aside>
			</article>
		</>
	);
};
