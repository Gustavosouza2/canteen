import { Chart } from "@/components/features/chart/Chart";
import { Card } from "@/components/features/card/Card";
import { useHome } from "../model/useHome";

export const HomeView = (props: ReturnType<typeof useHome>) => {
  const { cardItems, isLoading } = props;

  return (
    <main className="flex flex-col max-w-fit gap-6 md:-ml-96 sm:px-10 my-24 relative items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card data={cardItems} isLoading={isLoading} />
      </div>

      <div className="w-full">
        <Chart isLoading={isLoading} />
      </div>
    </main>
  );
};
