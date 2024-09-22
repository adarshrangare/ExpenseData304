'use client'
import FormArea from "@/components/FormArea";
import Main from "@/components/main";

export default function Home() {
  return (
    <>
    <main className="mx-auto max-w-screen-sm ">
      <div className="font-bold my-4">
        <h1 className="text-center text-2xl ">Expense App</h1>
        <p className="text-center text-2xl ">304</p>

        {/* <FormArea/> */}

        <Main/>

      </div>
    </main>
    </>
  );
}
