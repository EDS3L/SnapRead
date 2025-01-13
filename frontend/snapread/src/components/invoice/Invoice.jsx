function Invoice() {
  return (
    <div className="flex">
      <header className="flex p-4  flex-col">
        <span className="text-gray-800 font-bold text-2xl">
          Dashboard{'>'}Faktury{' '}
        </span>

        <div className="flex justify-between mt-2 p-4">
          <span className="text-gray-800 font-extrabold text-3xl">Faktury</span>
          <button className="bg-blue-600">Dodaj fakturę</button>
        </div>
      </header>
      <main></main>
      <footer></footer>
    </div>
  );
}

export default Invoice;
