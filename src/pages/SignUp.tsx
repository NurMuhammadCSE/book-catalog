import { useLocation, useNavigate } from "react-router-dom";
import SignUpForm from "../components/ui/SignUpForm";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { setUser } from "../redux/features/user/userSlice";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const path = location?.state?.path?.pathname || "/";

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
          <h2 className="card-title text-center">Sign Up!</h2>

          <SignUpForm />
          <p className="text-sm">
            Already have an account,{" "}
            <span
              onClick={() => navigate("/sign-in")}
              className="link link-primary"
            >
              sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
