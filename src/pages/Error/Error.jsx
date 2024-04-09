import React from 'react'
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
export default function Error() {
  return (
    <div>
      <Header></Header>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-[110px]">404 Not Found</h1>
          <p className="mt-[70px] text-base leading-7 text-gray-600 text-[16px]">Your visited page not found. You may go home page.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Back to home page
            </a>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}
