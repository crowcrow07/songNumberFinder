import Header from "@/components/header";
import ResultsBox from "@/components/results_box";

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center bg-[#ebebeb] max-screen:overflow-y-scroll">
      <div className="xl:w-[1280px] lg:w-[1024px] md:w-[768px] sm:w-[640px] w-[80%] flex gap-16 flex-col items-center justify-center min-h-[660px] h-screen">
        <Header />
        <ResultsBox />
      </div>
    </main>
  );
}
