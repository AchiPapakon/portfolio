import type { ListSuggestion } from "./ListSuggestion";

export interface GetStationDepartures {
  id: number;
}

export interface StationDeparture {
  lineNumber: string;
  color: string;
  destinationName: string;
  dateTime: string;
  isRealTime: boolean;
  key: string;
}

export interface StationDepartures {
  [directionId: number]: StationDeparture[];
}

export interface StationDetails {
  [title: string]: StationDepartures;
}

export interface WebSocketMessage<
  TEvent extends string = string,
  TData = unknown
> {
  name: TEvent;
  payload?: TData;
}

export type GetStationDeparturesResponse = WebSocketMessage<
  "getStationDeparturesResponse",
  StationDetails
>;

export type GetNearestStationResponse = WebSocketMessage<
  "getNearestStationResponse",
  ListSuggestion
>;

interface Stop {
  distance: string;
  // id: string;
  name: string;
  transportType: string;
}

export interface Stops {
  [id: string]: Stop;
}
