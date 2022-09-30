import * as React from 'react';
import { LayoutContext } from '../../context/LayoutContext';
import {
	Dropdown,
	Shelf,
	SearchBar,
	Loading,
	Alert,
	FilterBtn,
	Title,
} from '../../components';
import { motion } from 'framer-motion';
import useDiscover from '../../hooks/useDiscover';

export const Discover = () => {
	const { alert, loading, closeSubmenu } = React.useContext(LayoutContext);
	const {
		state: { books, search },
		functions: {
			backToAll,
			filterByCategory,
			filterByLanguage,
			filterByStatus,
			handleSearch,
		},
		sets: { categories, lenguajes, status },
	} = useDiscover();

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
					<Title content="Entdecke jetzt neue Bücher" />
					<section className="search-and-filter">
						<FilterBtn onClick={backToAll}>alle bücher</FilterBtn>
						<SearchBar search={search} handleSearch={handleSearch} />
						<Dropdown options={categories} onChange={filterByCategory} />
						<Dropdown options={lenguajes} onChange={filterByLanguage} />
						<Dropdown options={status} onChange={filterByStatus} />
					</section>
					<Shelf element={books} />
					{alert.display && <Alert />}
				</motion.main>
			)}
		</>
	);
};
