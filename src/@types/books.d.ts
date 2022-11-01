import { AuthState } from './auth';

export interface IBook {
	_id: string;
	name: string;
	author: string;
	category: string;
	language: string;
	condition: string;
	ownerId: string;
	ownerName: string;
	borrowerId?: string;
	borrowerName?: string;
	status: string;
	description: string;
	image?: string;
}

export interface ILendingList {
	books: IBook[];
}

export interface BookState {
	allBooks: IBook[];
	books: IBook[];
	book: IBook;
	bookImage: any | null;
	search: string;
	userBooks: IBook[];
	lendingList: ILendingList;
	setAllBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
	setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
	setBook: React.Dispatch<React.SetStateAction<IBook>>;
	setBookImage: React.Dispatch<React.SetStateAction<any | null>>;
	handleSearch: (e: any) => void;
	backToAll: () => void;
	filterByCategory: (e: any) => void;
	filterByLanguage: (e: any) => void;
	filterByStatus: (e: any) => void;
	categoryOptions: any[];
	statusOptions: any[];
	languageOptions: any[];
	deleteBook: () => void;
	updateBookDetails: (e: any) => void;
	changeBookDetails: (e: any) => void;
	returnBook: (id?: string) => void;
}
