export const collections = {
  Collection: ["Stand", "Barb"],
  "Collection.001": ["SC_11_1", "SC_11_2", "SC_11_3", "SC_11_4", "SC_11_5"],
  S1: [],
  S2: [],
  S3: [],
  SC_11: ["SC_11_1", "SC_11_2", "SC_11_3", "SC_11_4", "SC_11_5", "SROL_11"],
  SC_12: ["SC_12_1", "SC_12_2", "SC_12_3", "SC_12_4", "SC_12_5", "SROL_12"],
  SC_13: ["SC_13_1", "SC_13_2", "SC_13_3", "SC_13_4", "SC_13_5", "SROL_13"],
  // SC_14: ["SC_14_1", "SC_14_2", "SC_14_3", "SC_14_4", "SC_14_5", "SROL_14"],
  SC_21: ["SROL_21", "SC_21_1", "SC_21_2", "SC_21_3", "SC_21_4", "SC_21_5"],
  SC_22: ["SROL_22", "SC_22_1", "SC_22_2", "SC_22_3", "SC_22_4", "SC_22_5"],
  SC_23: ["SROL_23", "SC_23_2", "SC_23_1", "SC_23_3", "SC_23_4", "SC_23_5"],
  SC_24: ["SROL_24", "SC_24_1", "SC_24_2", "SC_24_3", "SC_24_4", "SC_24_5"],
  SC_31: ["SROL_31", "SC_31_1", "SC_31_2", "SC_31_3", "SC_31_4", "SC_31_5"],
  SC_32: ["SROL_32", "SC_32_1", "SC_32_2", "SC_32_3", "SC_32_4", "SC_32_5"],
  SC_33: ["SROL_33", "SC_33_1", "SC_33_2", "SC_33_3", "SC_33_4", "SC_33_5"],
  SC_34: ["SROL_34", "SC_34_1", "SC_34_2", "SC_34_3", "SC_34_4", "SC_34_5"],
  SC_35: ["SROL_35", "SC_35_1", "SC_35_2", "SC_35_3", "SC_35_4", "SC_35_5"],
};

export const maps = {
  SC_11: {
    left: null,
    right: "SC_12",
    position: { x: 0, y: 0, z: 0 },
    min: -1.1,
    max: -1.1,
  },
  SC_12: {
    left: "SC_11",
    right: "SC_13",
    position: { x: 0, y: 0, z: 0 },
    min: -0.3,
    max: -0.3,
  },
  SC_13: {
    left: "SC_12",
    right: null,
    position: { x: 0, y: 0, z: 0 },
    min: 0.4,
    max: 1.1,
  },
  // SC_14: {
  //   left: "SC_13",
  //   right: null,
  //   position: { x: 0, y: 0, z: 0 },
  //   min: 0.5,
  //   max: 0.9,
  // },
  SC_21: {
    left: null,
    right: "SC_22",
    position: { x: 0, y: 0, z: 0 },
    min: -0.9,
    max: -0.9,
  },
  SC_22: {
    left: "SC_21",
    right: "SC_23",
    position: { x: 0, y: 0, z: 0 },
    min: -0.3,
    max: -0.3,
  },
  SC_23: {
    left: "SC_22",
    right: "SC_22",
    position: { x: 0, y: 0, z: 0 },
    min: 0.4,
    max: 0.4,
  },
  SC_24: {
    left: "SC_23",
    right: null,
    position: { x: 0, y: 0, z: 0 },
    min: 0.9,
    max: 0.9,
  },
};