const Loading = () => {
  return (
    <div className="flex min-h-[300px] items-center justify-center">

      <div className="flex flex-col items-center">

        {/* Loading spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

        {/* Loading text */}
        <p className="mt-4 text-gray-600">
          Loading destinations...
        </p>

      </div>
    </div>
  );
};

export default Loading;