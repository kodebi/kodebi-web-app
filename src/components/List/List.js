import * as React from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '@kodebi/libkodebi-ui';

export const List = ({ elements, returnBook }) => {
	const { userName } = React.useContext(AuthContext);
	return (
		<>
			<div className="list-container">
				{elements?.length > 0 ? (
					<table className="list">
						<thead>
							<tr>
								<th className="list-header">Bild</th>
								<th className="list-header">Titel</th>
								<th className="list-header">AutorIn</th>
								<th className="list-header">Zustand</th>
								<th className="list-header">Verliehen an</th>
								<th className="list-header">Zurückbekommen?</th>
							</tr>
						</thead>
						<tbody>
							{elements?.map((element) => {
								const {
									_id,
									image,
									name,
									author,
									condition,
									borrowerName,
									ownerName,
								} = element;
								if (ownerName === userName) {
									return (
										<tr key={_id}>
											<td>
												<img
													src={image}
													alt="Miss Merkel"
													className="list-img"
												/>
											</td>
											<td>{name}</td>
											<td>{author}</td>
											<td>{condition}</td>
											<td>{borrowerName}</td>
											<td>
												<Button
													variant="filter"
													onClick={() => returnBook(_id)}
													label="Bestätigen"
												/>
											</td>
										</tr>
									);
								}
							})}
						</tbody>
					</table>
				) : (
					<h4 className="title txt-center">
						Aktuell hast du keine Bücher an irgendwen verliehen
					</h4>
				)}
			</div>
		</>
	);
};
