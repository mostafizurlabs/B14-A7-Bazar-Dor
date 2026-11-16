import React from 'react';


const Loading = () => {
  return (
    <main className="min-h-screen w-full bg-[#F0F5F0] py-8 sm:py-10">
      <div className="mx-auto max-w-5xl space-y-5 px-4 sm:px-6">

        <div className="flex animate-pulse items-center gap-4 rounded-3xl border border-[#DDE7DE] bg-white p-5 shadow-sm sm:gap-6 sm:p-7">
          <div className="h-16 w-16 shrink-0 rounded-2xl bg-slate-200 sm:h-20 sm:w-20" />

          <div className="flex flex-1 flex-col gap-3">
            <div className="h-7 w-40 rounded-lg bg-slate-200 sm:w-52" />
            <div className="h-4 w-48 rounded-lg bg-slate-200 sm:w-64" />
          </div>
        </div>

        <div className="flex animate-pulse flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:px-5">
          <div className="h-4 w-36 rounded-lg bg-slate-200" />
          <div className="h-9 w-36 rounded-xl bg-slate-200" />
        </div>


        <div className="grid grid-cols-1 gap-5 pt-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="h-52 animate-pulse rounded-3xl border border-slate-200/80 bg-white p-5"
            >
              <div className="mb-4 h-12 w-12 rounded-xl bg-slate-200" />
              <div className="mb-3 h-5 w-3/4 rounded-lg bg-slate-200" />
              <div className="mb-5 h-4 w-1/2 rounded-lg bg-slate-200" />
              <div className="h-8 w-2/3 rounded-lg bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
