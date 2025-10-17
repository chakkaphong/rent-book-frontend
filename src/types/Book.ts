export interface BookList {
  id: string;
  title: string;
  author: string;
  publication?: string;
  cover: string;
}


export interface UserData {
  id: string;
  username: string;
}

export interface RentalData {
  id: string;
  rentDate: string;
  user: UserData;
}

export interface BookDetail {
  id: string;
  title: string;
  author: string;
  ISBN: string;
  publication?: string;
  year: string;
  pricePerDay: number;
  totalStock: number;
  cover: string;
  createdAt: string;
  rentals: RentalData[],
  message?: string;
  success?: boolean;
}



export interface BookCreateReqeust {
  title: string;
  author: string;
  ISBN?: string;
  publication?: string;
  year?: string;
  pricePerDay?: number;
  totalStock?: number;
  cover?: string;
}


export interface BookUpdateReqeust {
  id: string;
  title: string;
  author: string;
  ISBN?: string;
  publication?: string;
  year?: string;
  pricePerDay?: number;
  cover?: string;
}
