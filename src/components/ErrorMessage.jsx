const ErrorMessage = ({ message = "Something went wrong." }) => {
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-red-200 bg-red-50 p-6 text-center">

      {/* Error title */}
      <h2 className="text-lg font-semibold text-red-700">
        Oops!
      </h2>

      {/* Error message */}
      <p className="mt-2 text-red-600">
        {message}
      </p>

    </div>
  );
};

export default ErrorMessage;