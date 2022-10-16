import { FaGithub, FaInstagram } from 'react-icons/fa';

const links = [
	{ id: 1, url: '/uploadbook', text: 'upload' },
	{ id: 2, url: '/dashboard', text: 'meine bücher' },
	{ id: 3, url: '/messages', text: 'nachrichten' },
];
const footerLinks = [
	{ to: '/imprint', children: 'impressum' },
	{ to: '/dataprivacy', children: 'datenschutz' },
];
const footerIcons = [
	{ href: 'https://instagram.com', children: <FaInstagram /> },
	{ href: 'https://github.com', children: <FaGithub /> },
];

export { links, footerLinks, footerIcons };
