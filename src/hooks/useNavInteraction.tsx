import * as React from 'react';
import { LayoutContext } from '../context/LayoutContext';

const useNavInteraction = () => {
	const [navbar, setNavbar] = React.useState(false);
	const [location, setLocation] = React.useState({});
	const container = React.useRef(null);
	const { closeSubmenu, setIsSubmenuOpen, setShowLinks, showLinks } =
		React.useContext(LayoutContext);

	// aktiviere sticky navbar beim scrollen
	React.useEffect(() => {
		const stickyNav = () => {
			if (window.scrollY >= 50) {
				setNavbar(true);
			} else {
				setNavbar(false);
			}
		};
		window.addEventListener('scroll', stickyNav);
		return () => {
			window.removeEventListener('scroll', stickyNav);
		};
	});

	// bestimme die Position des Submenus
	React.useLayoutEffect(() => {
		const submenu = container.current;
		const { divCenter, divBottom } = location;
		submenu.style.left = `${divCenter}px`;
		submenu.style.bottom = `${divBottom}px`;
	}, [location]);

	// toggle Navbar in mobiler Ansicht
	const toggleNavbar = () => {
		setShowLinks(!showLinks);
	};

	// öffne das Usermenu rechts oben
	const openSubmenu = (coordinates) => {
		setLocation(coordinates);
		setIsSubmenuOpen(true);
	};

	// schliesse das Usermenu unabhängig davon wo der User hinklickt (außerhalb des Usermenus)
	const hideSubmenu = (e) => {
		if (!e.target.classList.contains('helper')) {
			closeSubmenu();
		}
	};

	// bestimme die Position des Submenus
	const showUserSubmenu = (e) => {
		const divSize = e.currentTarget.getBoundingClientRect();
		const divCenter = (divSize.left + divSize.right) / 2;
		const divBottom = divSize.bottom - 3;
		openSubmenu({ divCenter, divBottom });
	};

	return {
		state: {
			navbar,
			location,
		},
		ref: { container },
		functions: {
			toggleNavbar,
			hideSubmenu,
			showUserSubmenu,
		},
	};
};

export default useNavInteraction;
