import { useLocation, useNavigate } from "react-router-dom";
import SignInForm from "../components/ui/SignInForm";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { setUser } from "../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const path = location.state?.path?.pathname || "/";
  console.log(location.state);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user?.email));
    });

    if (user.email) {
      navigate(path, { replace: true });
    }
  }, [dispatch, user.email, path, navigate]);

  return (
    <div className="flex items-center justify-center h-screen my-8 md:my-0">
      <div className="card lg:card-side bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Sign In!</h2>
          <SignInForm />
          <p className="text-sm">
            Don't have any account,{" "}
            <span
              onClick={() => navigate("/sign-up")}
              className="link link-primary"
            >
              sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
