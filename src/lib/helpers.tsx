import trendDown from "../assets/icons/trend-down.svg";
import trendUp from "../assets/icons/trend-up.svg";
import addressIcon from "../assets/icons/address.svg";

export const roundFuelConsumed = (value: number) => {
  if (typeof value !== "number" || isNaN(value)) {
    return 0;
  }
  return Math.round(value / 1000) * 1000;
};

export const renderRouteName = (src: string, dest: string) => {
  return (
    <div className="flex items-center gap-4">
      <img src={addressIcon} alt="" />
      <span className="capitalize font-bold text-gray-700">
        {src?.toLowerCase() + " -> " + dest?.toLowerCase()}
      </span>
    </div>
  );
};

export const renderFuelConsumed = (value: number) => {
  if (typeof value !== "number" || isNaN(value)) {
    return <></>;
  }
  const roundedValue = roundFuelConsumed(value);
  return (
    <strong className="text-gray-700">
      {formatNumberToString(roundedValue)} L
    </strong>
  );
};

export const renderCostPerKm = (value: number) => {
  if (typeof value !== "number" || isNaN(value)) {
    return <></>;
  }
  return (
    <strong className="text-gray-700">${formatNumberToString(value)}</strong>
  );
};

export const renderEmissionImpact = (value: number) => {
  if (typeof value !== "number" || isNaN(value)) {
    return <></>;
  }
  const roundedValue = Math.round(value / 100) * 100;
  return (
    <strong className="text-gray-700">
      {formatNumberToString(roundedValue)} kg CO2
    </strong>
  );
};

export const renderPerformanceTrend = (value: number) => {
  if (typeof value !== "number" || isNaN(value)) {
    return <></>;
  }

  const percent = Math.round(Math.abs(value * 1000)) / 10;

  if (value === 0) {
    return (
      <span className="text-gray-700 font-semibold flex items-baseline gap-x-1">
        {percent}%
      </span>
    );
  }

  return value < 0 ? (
    <span className="text-orange-500 font-semibold flex items-baseline gap-x-1">
      {percent}% <img src={trendDown} alt="" />
    </span>
  ) : (
    <span className="text-green-500 font-semibold flex items-baseline gap-x-1">
      {percent}% <img src={trendUp} alt="" />
    </span>
  );
};

/**
 *
 * @param value
 * @param locale can be in [en-US, de-DE, ru-RU, hi-IN, de-CH], default is `en-US`
 */
export const formatNumberToString = (value: number, locale = "en-US") => {
  var opts = { minimumFractionDigits: 0 };
  return Math.round(value).toLocaleString(locale, opts);
};
