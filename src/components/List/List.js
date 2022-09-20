import * as React from 'react';
import { FilterBtn } from '../FilterBtn';

export const List = ({ elements }) => {
	return (
		<>
			<table className="list">
				<thead>
					<tr>
						<th className="list-header">Bild</th>
						<th className="list-header">Titel</th>
						<th className="list-header">AutorIn</th>
						<th className="list-header">Zustand</th>
						<th className="list-header">Verliehen an</th>
						<th className="list-header">Zurückgegeben?</th>
					</tr>
				</thead>
				<tbody>
					{elements?.map((element, index) => {
						const { image, name, author, condition, borrowerName } = element;
						return (
							<tr key={index}>
								<td>
									<img src={image} alt="Miss Merkel" className="list-img" />
								</td>
								<td>{name}</td>
								<td>{author}</td>
								<td>{condition}</td>
								<td>{borrowerName}</td>
								<td>
									<FilterBtn style={{ marginBottom: '0' }}>
										Bestätigen
									</FilterBtn>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
