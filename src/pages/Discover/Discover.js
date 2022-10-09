import * as React from 'react';
import { LayoutContext } from '../../context/LayoutContext';
import { Dropdown, Shelf, Loading, Alert, Title } from '../../components';
import { motion } from 'framer-motion';
import useDiscover from '../../hooks/useDiscover';
import { Button, Input } from '@kodebi/libkodebi-ui';

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
						<Button variant="filter" onClick={backToAll} label="Alle Bücher" />
						<Input
							variant="search"
							name="search"
							id="id"
							value={search}
							onChange={handleSearch}
							placeholder="Nach Titel oder Autor*in suchen..."
						/>
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
