import { FormResponseType } from "../types";

export interface DescriptionProps {
  formData: FormResponseType
}

export type ChartProps = {
  size?: number;
  data: FormResponseType;
};
