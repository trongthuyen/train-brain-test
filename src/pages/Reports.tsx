import { useEffect, useMemo, useState } from "react";
import FilterPopover from "../components/FilterPopover";
import HeaderReports from "../components/HeaderReports";
import { ActiveRoute, MetricData, Option } from "../lib/types";
import {
  FILTER_TIMEFRAME_OPTIONS,
  FILTER_TOPIC_OPTIONS,
  FILTER_TRAIN_OPTIONS,
  MS_ONE_DAY,
} from "../lib/constants";
import Card from "../components/Card";
import RoutePerformanceRankings from "../components/RoutePerformanceRankings";
import { getActiveRoutes, getMetrics } from "../lib/api";
import { formatNumberToString, roundFuelConsumed } from "../lib/helpers";

const Reports = () => {
  const [timeframeSelection, setTimeframeSelection] = useState<Option>(
    FILTER_TIMEFRAME_OPTIONS[FILTER_TIMEFRAME_OPTIONS.length - 1]
  );
  const [trainSelection, setTrainSelection] = useState<Option>(
    FILTER_TRAIN_OPTIONS[0]
  );
  const [topicSelection, setTopicSelection] = useState<Option>(
    FILTER_TOPIC_OPTIONS[0]
  );

  const [activeRoutes, setActiveRoutes] = useState<ActiveRoute[]>([]);
  const [metricsData, setMetricsData] = useState<MetricData[]>([]);
  const [filteredMetrics, setFilteredMetrics] = useState<MetricData[]>([]);

  const [loadingMetrics, setLoadingMetrics] = useState(true);

  const totalActiveRoutes = useMemo(() => {
    return activeRoutes.reduce((sum, curr) => {
      if (curr.is_active) {
        return sum + 1;
      }
      return sum;
    }, 0);
  }, [activeRoutes]);

  const totalFuelConsumed = useMemo(() => {
    return filteredMetrics.reduce((sum, curr) => {
      return sum + roundFuelConsumed(curr.fuel_consumption_in_litres);
    }, 0);
  }, [filteredMetrics]);

  const avgTrainSpeed = useMemo(() => {
    if (!filteredMetrics.length) {
      return 0;
    }
    const total = filteredMetrics.reduce((sum, curr) => {
      return sum + curr.train_speed_kmh;
    }, 0);
    return Math.round(total / filteredMetrics.length);
  }, [filteredMetrics]);

  const onChangeTimeframe = (selection: Option) => {
    setLoadingMetrics(true);
    setTimeframeSelection(selection);
  };

  const onFilterByTimeframe = () => {
    const result = metricsData.filter((item) => {
      const now = new Date().getTime();
      const pastTime = now - Number(timeframeSelection.value ?? 0) * MS_ONE_DAY;
      const itemTime = new Date(item.date).getTime();
      return pastTime <= itemTime;
    });
    setFilteredMetrics(result);
    // setLoadingMetrics(false);
    setTimeout(() => setLoadingMetrics(false), 1000);
  };

  useEffect(() => {
    getActiveRoutes().then((data) => {
      setActiveRoutes(data);
    });
    getMetrics()
      .then((data) => {
        setMetricsData(data);
      })
      .catch(() => {
        // setLoadingMetrics(false);
      });
  }, []);

  useEffect(() => {
    // setLoadingMetrics(true);
    onFilterByTimeframe();
  }, [metricsData, timeframeSelection]);

  // to demo loading in 1s
  useEffect(() => {
    setTimeout(() => setLoadingMetrics(false), 1000);
  }, []);

  return (
    <div className="h-screen overflow-auto">
      <HeaderReports />
      <hr className="ml-6 border-b border-neutral-200" />

      {/* CONTEXT */}
      <div className="p-8 flex flex-col gap-6 w-full">
        {/* FILTERS */}
        <div className="lg:flex items-center gap-4 flex-wrap">
          <FilterPopover
            label="Timeframe"
            selection={timeframeSelection}
            onSelect={onChangeTimeframe}
            options={FILTER_TIMEFRAME_OPTIONS}
          />
          <FilterPopover
            label="Train"
            selection={trainSelection}
            onSelect={setTrainSelection}
            options={FILTER_TRAIN_OPTIONS}
          />
          <FilterPopover
            label="Topic"
            selection={topicSelection}
            onSelect={setTopicSelection}
            options={FILTER_TOPIC_OPTIONS}
          />
        </div>

        {/* CARDS */}
        <div className="flex items-center gap-4 flex-wrap">
          <Card label="Active Routes">
            <strong className="text-2xl">{totalActiveRoutes}</strong>{" "}
            <strong className="text-gray-500">/ {activeRoutes.length}</strong>
          </Card>
          <Card label="Total Fuel Consumed">
            <strong className="text-2xl text-gray-500">
              {formatNumberToString(totalFuelConsumed)} L
            </strong>
          </Card>
          <Card label="Av. Train Speed">
            <strong className="text-2xl text-gray-500">
              {formatNumberToString(avgTrainSpeed)} km/h
            </strong>
          </Card>
        </div>

        {/* DATA TABLE */}
        <div className="flex items-center gap-4 flex-1">
          <RoutePerformanceRankings
            data={filteredMetrics}
            loading={loadingMetrics}
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;
