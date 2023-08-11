import { useForm } from "react-hook-form";
import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/interface";
import { usePostBookMutation } from "../redux/features/book/bookApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AddBook() {
  const [addBook, { isSuccess, isError /* isLoading */ }] =
    usePostBookMutation();
  const { user } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<IBook>();

  const onSubmit = (data: IBook) => {
    const newBook = {
      ownerEmail: user.email,
      title: data.title,
      author: data.author,
      genre: data.genre,
      reviews: [],
      publicationDate: data.publicationDate,
      image: data.image,
      details: data.details,
    };
    addBook(newBook);
    toast.success(`Book added successfully`);
    reset();
  };

  useEffect(() => {
    if (isSuccess)
      toast.success("Successfully added the book", { id: "addBook" });
    if (isError) toast.error("Failed to add the book 😔", { id: "error" });
  }, [isSuccess, isError]);

  return (
    <div className="page_main">
      <h2 className="text-2xl text-center text-primary">Add New Book</h2>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200 mx-auto">
        <form className="w-[700px] " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                id="title"
                {...register("title")}
                type="text"
                required
                placeholder="Book Title"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Author</span>
              </label>
              <input
                id="author"
                {...register("author")}
                required
                type="text"
                placeholder="Book Author"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Genre</span>
              </label>
              <input
                id="genre"
                {...register("genre")}
                required
                type="text"
                placeholder="Book Genre"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Publication Date</span>
              </label>
              <input
                id="publicationDate"
                {...register("publicationDate")}
                required
                type="text"
                placeholder="Book publication date"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                id="image"
                {...register("image")}
                required
                type="text"
                placeholder="Image Link"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Details</span>
              </label>
              <input
                id="details"
                {...register("details")}
                required
                type="text"
                placeholder="Type Details here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button type="submit" className="btn btn-info">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
