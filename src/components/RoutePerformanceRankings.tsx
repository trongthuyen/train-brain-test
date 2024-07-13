import checkCircleIcon from "../assets/icons/check-circle.svg";
import { MetricData } from "../lib/types";
import menuIcon from "../assets/icons/tridots.svg";
import {
  formatNumberToString,
  renderPerformanceTrend,
  renderRouteName,
} from "../lib/helpers";

interface RoutePerformanceRankingsProps {
  data: MetricData[];
}

const RoutePerformanceRankings = ({ data }: RoutePerformanceRankingsProps) => {
  return (
    <div className="bg-white w-full rounded-lg p-6 overflow-auto">
      <div className="flex justify-between">
        {/* TABLE HEADER */}
        <div>
          <p className="text-lg font-bold text-gray-700">
            Route Performance Rankings
          </p>
          <div className="text-sm text-gray-400 flex items-center my-3">
            <img src={checkCircleIcon} alt="" />
            <strong className="mx-1">{data.length} routes</strong>
            <span>have improved fuel consumption this month</span>
          </div>
        </div>
        {/* MENU */}
        <img src={menuIcon} alt="" className="h-fit" />
      </div>

      {/* TABLE */}
      <div className="w-full mt-2">
        <table className="w-full">
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
            {data.map((row, idx) => (
              <tr key={idx} className="border-t-neutral-200 border-t">
                <td className="px-0 py-4 border-none">
                  {renderRouteName(row.start_destination, row.end_destination)}
                </td>
                <td className="px-0 py-4 border-none">
                  <strong className="text-gray-700">
                    {formatNumberToString(row.fuel_consumption_in_litres)} L
                  </strong>
                </td>
                <td className="px-0 py-4 border-none">
                  <strong className="text-gray-700">
                    ${formatNumberToString(row.operation_costs_dollars)}
                  </strong>
                </td>
                <td className="px-0 py-4 border-none">
                  <strong className="text-gray-700">
                    {formatNumberToString(row.emission_kg_co2)} kg CO2
                  </strong>
                </td>
                <td className="px-0 py-4 border-none">
                  {renderPerformanceTrend(row.performance_trend)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoutePerformanceRankings;
