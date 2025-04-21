import { Link } from "react-router";
import { MdArrowBack } from "react-icons/md";
import errorImage from "../assets/images/error/1.png";
import PrimaryButton from "../components/UI/PrimaryButton";

const ErrorPage = () => {
  return (
    <div className="h-full flex items-center justify-center  p-4">
      <div className="text-center space-y-6 max-w-lg">
        <img
          src={errorImage}
          alt="404 Error"
          className="w-full max-w-md mx-auto"
        />

        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
          <p className="text-xl text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link to="/">
          <PrimaryButton name="Back to Home" variant='outlined' />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
