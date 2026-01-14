export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300 max-w-sm w-full">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-100 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-[#D40511] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800">กำลังประมวลผล</h3>
          <p className="text-gray-500 text-sm">Please wait a moment...</p>
        </div>
      </div>
    </div>
  );
}
