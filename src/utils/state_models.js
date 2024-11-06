import { formatDateToInput } from "./date_functions";

export const complaintInitialState = {
  type: "",
  unit: "",
  customer: "",
  salesOrder: "",
  sector: "",
  product: "",
  category: "",
  reason: "",
};

export const occurrenceInitialState = {
  type: "",
  unit: "",
  customer: "",
  salesOrder: "",
  sector: "",
  product: "",
  category: "",
  reason: "",

  //insecurity
  problem: "",
  solutionObs: "",
  detection: "",
  area: "",
  local: "",
};

export const insecurityRequiredFields = [
  "unit",
  "area",
  "sector",
  "local",
  "detection",
  "problem",
];

export const insecurityTasks = [
  {
    _id: "",
    remove: false,
    description: "",
    userId: "",
    startDate: formatDateToInput(new Date()),
    endDate: formatDateToInput(new Date()),
    status: "", //pending,finished
  },
];
