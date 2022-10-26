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
import { LayoutState } from '../../@types/layout';

export const UserProfile: React.FC = (): JSX.Element => {
	const { alert, closeSubmenu, loading } = React.useContext(
		LayoutContext
	) as LayoutState;
	const { id } = useParams();
	const {
		state: { userBooks },
	} = useUserProfile(id);

	const whose = userBooks[0]?.ownerName.concat('s');
	const whoUser = userBooks[0]?.ownerName;

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
					<Title content={`${whose} Profil`} />
					<UserDashboard user={whoUser} bookCount={userBooks?.length} />
					<Shelf element={userBooks} user={whoUser} />
					{alert.display && <Alert />}
				</motion.main>
			)}
		</>
	);
};
