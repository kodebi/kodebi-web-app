import { Box, Card } from '@kodebi/libkodebi-ui';
import React from 'react';
import { FaBookOpen, FaUserCircle } from 'react-icons/fa';

export const UserDashboard = ({ user, bookCount, totalLentBooks }) => {
	return (
		<>
			<Card withBorders shadow="light" maxWidth="1180px">
				<Box variant="shelf" className="dashboard">
					<aside className="user-info">
						<span className="user-pic">
							<FaUserCircle />
						</span>
						<div className="user-name">
							<h3>{user}</h3>
							<p>Aktiv seit 2022</p>
						</div>
					</aside>
					<aside className="user-statistics">
						<article className="stat">
							<h4>Im Regal</h4>
							<span className="stat-iconumber">
								<span className="book-icon">
									<FaBookOpen />
								</span>
								<h4 className="stat-number">{bookCount}</h4>
							</span>
						</article>
						{totalLentBooks && (
							<article className="stat">
								<h4>Geliehen/verliehen</h4>
								<span className="stat-iconumber">
									<span className="book-icon">
										<FaBookOpen />
									</span>
									<h4 className="stat-number">{totalLentBooks}</h4>
								</span>
							</article>
						)}
					</aside>
				</Box>
			</Card>
		</>
	);
};
