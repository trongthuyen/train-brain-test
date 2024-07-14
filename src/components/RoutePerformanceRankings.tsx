import checkCircleIcon from "../assets/icons/check-circle.svg";
import { MetricData } from "../lib/types";
import menuIcon from "../assets/icons/tridots.svg";
import {
  formatNumberToString,
  renderCostPerKm,
  renderEmissionImpact,
  renderFuelConsumed,
  renderPerformanceTrend,
  renderRouteName,
} from "../lib/helpers";
import { useMemo } from "react";
import LoadingSpin from "./shared/LoadingSpin";

interface RoutePerformanceRankingsProps {
  data: MetricData[];
  loading?: boolean;
}

const RoutePerformanceRankings = ({
  data,
  loading,
}: RoutePerformanceRankingsProps) => {
  const improvedRouteCount = useMemo(() => {
    return data.reduce(
      (sum, curr) => (curr.performance_trend > 0 ? sum + 1 : sum),
      0
    );
  }, [data]);

  return (
    <div className="bg-white w-full h-full rounded-lg p-6 overflow-auto">
      <div className="flex justify-between">
        {/* TABLE HEADER */}
        <div>
          <p className="text-lg font-bold text-gray-700">
            Route Performance Rankings
          </p>
          <div className="text-sm text-gray-400 flex items-center my-3">
            <img src={checkCircleIcon} alt="" />
            <strong className="mx-1">{improvedRouteCount} routes</strong>
            <span>have improved fuel consumption this month</span>
          </div>
        </div>
        {/* MENU */}
        <img src={menuIcon} alt="" className="h-fit" />
      </div>

      {/* TABLE */}
      <div className="bg-white w-full h-full min-h-80 lg:min-h-0 relative overflow-auto mt-2">
        <table className="absolute h-full w-full top-0 left-0 lg:relative min-w-[700px]">
          <thead className="bg-inherit border-t-0">
            <tr>
              <th className="px-0 border-none text-gray-400 font-bold">
                Route Name
              </th>
              <th className="px-0 border-none text-gray-400 font-bold">
                Fuel Consumption
              </th>
              <th className="px-0 border-none text-gray-400 font-bold">
                Operational Cost Per Km
              </th>
              <th className="px-0 border-none text-gray-400 font-bold">
                Emission Impact
              </th>
              <th className="px-0 border-none text-gray-400 font-bold">
                Performance Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-t-neutral-200 border-t hover:bg-blue-50"
                >
                  <td className="px-0 py-4 border-none">
                    {renderRouteName(
                      row.start_destination,
                      row.end_destination
                    )}
                  </td>
                  <td className="px-0 py-4 border-none">
                    {renderFuelConsumed(row.fuel_consumption_in_litres)}
                  </td>
                  <td className="px-0 py-4 border-none">
                    {renderCostPerKm(row.operation_costs_dollars)}
                  </td>
                  <td className="px-0 py-4 border-none">
                    {renderEmissionImpact(row.emission_kg_co2)}
                  </td>
                  <td className="px-0 py-4 border-none">
                    {renderPerformanceTrend(row.performance_trend)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading ? (
          <div className="mt-8 lg:mt-0 border-t border-t-neutral-200">
            <div className="p-4 w-fit mx-auto">
              <LoadingSpin />
            </div>
          </div>
        ) : (
          !data.length && (
            <div className="mt-8 lg:mt-0 border-t border-t-neutral-200">
              <p className="p-4 text-base text-center font-semibold text-gray-500">
                No result found
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RoutePerformanceRankings;
