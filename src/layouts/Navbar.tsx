import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { setUser } from "../redux/features/user/userSlice";
import { useEffect } from "react";

export default function Navbar() {
  // const [wishlistOpen, setWishlistOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const path = location?.state?.path?.pathname || "/";

  // const { data: wishlists } = useGetWishlistsQuery(user.email!);

  const handleLogOut = () => {
    signOut(auth);
    dispatch(setUser(null));
    // window.location.reload();
  };

  // const { data: readingLists } = useGetBooklistsQuery(user?.email!);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user?.email));
    });

    if (user.email) {
      navigate(path, { replace: true });
    }
  }, [dispatch, user.email, path, navigate]);

  return (
    <div className="navbar bg-base-300 shadow-lg">
      <div className="flex-1">
        <a
          onClick={() => navigate("/")}
          className="btn btn-ghost font-mono text-xl"
        >
          Books Hub
        </a>
      </div>

      <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
        <Link
          to={`/reading-list/${user?.email}`}
          className="btn btn-ghost "
          
        >
          <div className="indicator">
            <h2>Reading List</h2>
          </div>

        </Link>
        <Link
          to={`/wish-list/${user?.email}`}
          className="btn btn-ghost "
          
        >
          <div className="indicator">
            <h2>Wish List</h2>
          </div>

        </Link>
        <Link className="btn btn-ghost " to={`all-books`}>
        <div className="indicator">
            <h2>All Books</h2>
          </div>
        </Link>
        {user.email ? (
          <button className="btn btn-success btn-sm" onClick={handleLogOut}>
            log out
          </button>
        ) : (
          <button
            onClick={() => navigate("/sign-in")}
            className="btn btn-success btn-sm"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
