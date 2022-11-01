export interface IAlert {
	display: boolean;
	icon: JSX.Element | string;
	msg: string;
}

export interface LayoutState {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	alert: IAlert;
	setAlert: React.Dispatch<React.SetStateAction<LayoutState['alert']>>;
	isTabLeft: boolean;
	setIsTabLeft: React.Dispatch<React.SetStateAction<boolean>>;
	closeSubmenu: () => void;
	isSubmenuOpen: boolean;
	setIsSubmenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	showLinks: boolean;
	setShowLinks: React.Dispatch<React.SetStateAction<boolean>>;
	hideLinks: () => void;
}
