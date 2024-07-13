export interface SidebarTabGroup {
  key: string;
  label: string;
  tabs: SidebarTabItem[];
}

export interface SidebarTabItem {
  key: string;
  label: string;
  path: string;
  icon: any;
}

export interface Option {
  label: string | JSX.Element;
  value: unknown;
  disabled?: boolean;
}

export interface MetricData {
  date: string;
  start_destination: string;
  end_destination: string;
  fuel_consumption_in_litres: number;
  operation_costs_dollars: number;
  emission_kg_co2: number;
  performance_trend: number;
  train_speed_kmh: number;
}

export interface ActiveRoute {
  id: string;
  route_name: string;
  is_active: boolean;
}
