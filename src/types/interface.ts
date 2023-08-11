export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: string; // Only a single string allowed for 'reviews'.
  image: string;
  details: string;
  addedBy: string | null;
};


export interface IWishlist {
  email: string;
  books: IBook[];
}

export interface IReview {
  userEmail: string;
  review: string;
}
