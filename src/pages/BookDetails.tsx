import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../components/ui/Reviews";
import { useGetBookQuery } from "../redux/features/book/bookApi";
// import { useAppSelector } from "../redux/hook";
import DeleteModal from "../components/ui/DeleteModal";

export default function BookDetails() {
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book } = useGetBookQuery(id!);
  // const { user } = useAppSelector((state) => state.user);
  // const verifiedUser = user?.email && book?.addedBy === user?.email;

  return (
    <div className="page_main">
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <img
            className="w-60 h-50"
            src={book?.image}
            alt=""
          />
        <div>
          <h4 className="text-xl text-primary font-semibold">
            {book?.title}{" "}
            <span className="text-sm text-slate-500 font-medium">
              by {book?.author}
            </span>
          </h4>
          <span className="badge badge-info">{book?.genre}</span>
          <p className="text-sm mt-2">
            <span className="font-semibold">Published On: </span>
            {book?.publicationDate}
          </p>
          <p>{book?.details}</p>
            <div className="flex items-center gap-x-2 mt-8">
              <button
                onClick={() => navigate(`/update-book/${book._id}`)}
                className="btn btn-sm bg-cyan-700 tooltip"
              >
                <h3>Update Book</h3>
              </button>
              <button
                onClick={() => setShowModal(!showModal)}
                className="btn btn-sm bg-red-700 tooltip"
              >
                <h1>Delete Book</h1>
              </button>
            </div>
          
        </div>
      </div>

      <Reviews id={id} />
      {showModal && <DeleteModal book={book} setShowModal={setShowModal} />}
    </div>
  );
}
