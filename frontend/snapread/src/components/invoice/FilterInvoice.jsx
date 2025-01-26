function FilterInvoice() {
  return (
    <div className="w-full h-1/6 bg-white rounded-lg flex  ">
      <div className="flex flex-col justify-center p-3 gap-1 w-1/5">
        <span className="text-slate-700 font-bold text-sm">FIRMA</span>
        <input
          type="text"
          placeholder="nip"
          className="bg-slate-200 p-3 rounded-md text-slate-700 placeholder:text-slate-700 "
        />
      </div>
      <div className="flex flex-col justify-center p-3 gap-1 w-1/5">
        <span className="text-slate-700 font-bold text-sm">NIP</span>
        <input
          type="text"
          placeholder="nip"
          className="bg-slate-200 p-3 rounded-md text-slate-700 placeholder:text-slate-700 "
        />
      </div>
      <div className="flex flex-col justify-center p-3 gap-1 w-1/5">
        <span className="text-slate-700 font-bold text-sm">NIP</span>
        <input
          type="text"
          placeholder="nip"
          className="bg-slate-200 p-3 rounded-md text-slate-700 placeholder:text-slate-700 "
        />
      </div>
      <div className="flex flex-col justify-center p-3 gap-1 w-1/5">
        <span className="text-slate-700 font-bold text-sm">NIP</span>
        <input
          type="text"
          placeholder="nip"
          className="bg-slate-200 p-3 rounded-md text-slate-700 placeholder:text-slate-700 "
        />
      </div>
      <div className="flex flex-col justify-center p-3 gap-1 w-1/5">
        <button className="bg-violet-700 p-3 rounded-md text-white font-bold hover:bg-violet-500">
          Filtruj
        </button>
      </div>
    </div>
  );
}

export default FilterInvoice;
