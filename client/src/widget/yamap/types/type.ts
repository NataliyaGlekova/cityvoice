import { Point } from "react-native-yamap";

type Section = {
  points: Point[];
  type: string;
  summary: string;
};

export type RouteResponse = {
  routes: {
    id: string;
    sections: Section[];
  }[];
  success: string;
  target: number;
};
