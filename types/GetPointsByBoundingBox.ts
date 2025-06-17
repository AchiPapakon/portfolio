export interface BoundingBoxData {
  Id: number;
  Name: string;
  LocalityName: string | null;
  Latitude: number;
  Longitude: number;
  Type: string;
  CategoryId: number | null;
  PoiCategory: string | null;
  Mode: number;
  TransportMode: string;
  Distance: number;
  LogicalId: number;
}

export interface PointsByBoundingBox {
  StatusCode: number;
  Message: string | number;
  Data: BoundingBoxData[];
}
