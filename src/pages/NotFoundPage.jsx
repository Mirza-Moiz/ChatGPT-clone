import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-5 text-red-900">This page does not exist</p>
      <Link
        to="/"
        className=" bg-[#43a724] hover:bg-[#74cb5acd] text-white rounded-[25px] transition-all duration-300 ease-in-out px-6 py-3 mt-4"
      >
        Go Back
      </Link>
    </section>
  );
};

export default NotFoundPage;
