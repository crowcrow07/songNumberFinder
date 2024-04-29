import Header from "@/components/header";
import ResultsBox from "@/components/results_box";

export default function Home() {
  return (
    <main className="w-screen flex justify-center h-screen overflow-y-scroll">
      <div className="xl:w-[1280px] lg:w-[1024px] md:w-[768px] sm:w-[640px] w-[80%]  flex gap-16 flex-col items-center justify-center bg-gray-50">
        <Header />
        <ResultsBox />
      </div>
    </main>
  );
}
