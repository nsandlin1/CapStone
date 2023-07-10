function News() {
    return (
      <div className="flex p-2 w-[100%] h-screen rounded-xl bg-slate-300 p-2 m-2">

        <div className="flex justify-center flex-col p-2 w-full h-[20%] sm:w-1/2 md:w-1/3 rounded-xl bg-slate-200 font-semibold">
          <p>ECONOMY:</p>
          </div>
  
        <div className="flex justify-center flex-col p-2 w-full h-[20%] sm:w-1/2 md:w-1/3 rounded-xl bg-slate-200 font-semibold">
          <p>CLIMATE:</p>
          </div>
  
        <div className="flex justify-center flex-col p-2 w-full h-[20%] sm:w-1/2 md:w-1/3 rounded-xl bg-slate-200 font-semibold">
          <p>SOCIAL:</p>
          </div>
      </div>
    );
  }
  
  export default News;