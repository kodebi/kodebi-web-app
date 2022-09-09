import * as React from 'react';
import { LayoutContext } from '../../context/LayoutContext';
import {
	UserDashboard,
	Loading,
	Alert,
	Shelf,
	Title,
	List,
} from '../../components';
import { motion } from 'framer-motion';
import useUserProfile from '../../hooks/useUserProfile';
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
	const { alert, closeSubmenu, loading } = React.useContext(LayoutContext);
	const { id } = useParams();
	const {
		state: { userBooks },
	} = useUserProfile(id);

	const whose = id ? userBooks[0]?.ownerName.concat('s') : 'Dein';
	const renderList = !id ? <List /> : null;

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<motion.main
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.25 }}
					onClick={closeSubmenu}
				>
					<Title content={`${whose} Bücherregal`} />
					<UserDashboard
						user={userBooks[0]?.ownerName}
						bookCount={userBooks?.length}
					/>
					{renderList}
					<Shelf element={userBooks} />
					{alert.display && <Alert />}
				</motion.main>
			)}
		</>
	);
};
