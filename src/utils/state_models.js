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
