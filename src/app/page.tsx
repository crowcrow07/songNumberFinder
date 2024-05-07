import Header from "@/components/header";
import ResultsBox from "@/components/results_box";

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-y-scroll flex justify-center bg-[#ebebeb]">
      <div className="xl:w-[1280px] lg:w-[1024px] md:w-[768px] sm:w-[640px] w-[80%] flex gap-16 flex-col items-center justify-center min-h-[680px]">
        <Header />
        <ResultsBox />
      </div>
    </main>
  );
}
