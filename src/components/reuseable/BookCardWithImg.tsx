import { useNavigate } from "react-router-dom";
import { IBook } from "../../types/interface";
import {
  useAddToWishlistMutation,
  useGetWishlistsQuery,
  useRemoveFromWishlistsMutation,
} from "../../redux/features/wishlist/wishlistApi";
import { useAppSelector } from "../../redux/hook";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/features/wishlist/wishlistSlice";
import {
  useAddToBooklistMutation,
  useGetBooklistsQuery,
} from "../../redux/features/readinglist/readinglist";
import { toast } from "react-hot-toast";
import { FaClipboardList } from "react-icons/fa6";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function BookCardWithImg({ book }: { book: IBook }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state:any) => state.user);
  const { data: wishlists } = useGetWishlistsQuery(user.email!);
  const [addToWishlistAPI] = useAddToWishlistMutation();
  const [removeFromWishlistAPI] = useRemoveFromWishlistsMutation();
  const { data: readinglists } = useGetBooklistsQuery(user.email!);
  const [addToReadingList] = useAddToBooklistMutation();

  const onAddWishlist = () => {
    const payload = { userEmail: user.email, book: book };
    dispatch(addToWishlist(book));
    addToWishlistAPI(payload);
    toast.success(`Successfully, ${book.title} added to wishlist`);
  };

  const onRemoveFromWishlist = () => {
    const payload = { email: user?.email, bookId: book?._id };
    dispatch(removeFromWishlist(book));
    removeFromWishlistAPI(payload);
    toast.success(`Successfully, ${book.title} removed from wishlist`);
  };

  const wishlisted = wishlists?.books?.find(
    (wishlist: IBook) => wishlist?._id === book?._id
  );

  const onAddReadinglist = () => {
    const payload = { userEmail: user.email, book };
    addToReadingList(payload);
    toast.success(`Successfully, ${book.title} added to booklist`);
  };

  const onUpdateReadinglist = () => {
    toast("Already added to wishlist!", {
      icon: "😀",
      style: { background: "#3c3c3c", color: "white" },
    });
  };

  const readinglisted = readinglists?.readingPlan?.find(
    (readinglist: IBook) => readinglist?._id === book?._id
  );

  return (
    <div className="card w-80 bg-base-200 shadow-xl">
      <figure>
      <img
            className="w-80 h-80 overflow-hidden"
            src={book.image}
            alt=""
          />
      </figure>
      <div className="card-body">
        {user?.email && (
          <div className=" flex justify-end">
            <button className="btn text-info text-1xl">
              {readinglisted ? (
                <FaClipboardList onClick={onUpdateReadinglist} />
              ) : (
                <HiOutlineClipboardList onClick={onAddReadinglist} />
              )}
              {/* Reading List */}
            </button>
            <button className="btn text-error text-1xl">
              {wishlisted ? (
                <AiFillHeart onClick={onRemoveFromWishlist} />
              ) : (
                <AiOutlineHeart onClick={onAddWishlist} />
              )}
              {/* Wish list */}
            </button>
          </div>
        )}
        <h2 className="card-title">{book.title.slice(0, 23)}</h2>
        <span className="badge badge-primary">{book.author}</span>

        <p className="font-light">
          <span className="font-semibold">Published:</span>{" "}
          {book.publicationDate}
        </p>
        <div className="card-actions">
          <div className="badge badge-sm badge-outline">{book.genre}</div>
        </div>
        <button
          onClick={() => navigate(`/book-details/${book._id}`)}
          className="btn btn-outline btn-primary"
        >
          See Details
        </button>
      </div>
    </div>
  );
}
