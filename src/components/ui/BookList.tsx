import { useNavigate } from "react-router-dom";
import BookCardWithImg from "../reuseable/BookCardWithImg";
import { useGetAllBooksQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../types/interface";
import Loading from "../reuseable/Loading";

export default function BookList() {
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  return (
    <div className="_section">
      <h2 className="text-center text-3xl text-info">Recent Books Added</h2>
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {data?.data?.slice(0, 10)?.map((book: IBook) => (
          <BookCardWithImg book={book} />
        ))}
      </div>
      <div className="text-center mt-5">
        <button
          onClick={() => navigate("/all-books")}
          className="btn btn-primary"
        >
          All Books
        </button>
      </div>
    </div>
  );
}
