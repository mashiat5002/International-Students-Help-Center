const Toast = ({
    type = "success",
    message = "",
   
  }: {
    type?: string;
    message?: string;
    showToast?: boolean;
  }) => (
    <div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50
        transition-all duration-300 `}
    >
      <div className={`bg-white text-gray-900 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-200 min-w-[260px]`}>
        {type === "success" ? (
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
  export default Toast