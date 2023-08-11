import { useParams } from "react-router-dom";
import { IBook } from "../types/interface";
import { useGetWishlistsQuery } from "../redux/features/wishlist/wishlistApi";


export default function WishList() {
  const { email } = useParams();

  const { data } = useGetWishlistsQuery(email!);
  const wishList = data?.books;

  return (
    <div className="min-h-[80vh]">
      <div className=" mt-14 mb-8">
        <h3 className="text-center text-3xl text-primary">Wish List</h3>
        <div className="overflow-x-auto">
          <table className="table border-neutral">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              {wishList?.map((book: IBook, idx: number) => (
                <tr id={book._id}>
                  <th>{idx + 1}</th>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
