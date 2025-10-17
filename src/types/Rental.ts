export interface RentBook {
    bookId: string;
}

export interface RentBookRequest {
    userId: string;
    books: RentBook[];
}


export interface RentBookResponse {
    success?: boolean;
    message?: string;
}

export interface ReturnBookRequest {
    userId: string;
    books: RentBook[];
}

export interface ReturnBookResponse {
    success?: boolean;
    message?: string;
}
