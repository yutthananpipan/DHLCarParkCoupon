export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-[#FFCC00]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300 max-w-xs w-full border-b-4 border-[#D40511]">
        <div className="relative">
          <div className="w-10 h-10 border-2 border-gray-100 rounded-full"></div>
          <div className="w-10 h-10 border-2 border-[#D40511] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="text-center">
          <h3 className="text-sm font-black text-gray-900 uppercase italic">Processing</h3>
        </div>
      </div>
    </div>
  );
}
