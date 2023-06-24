import {
  collections as smallCollections,
  maps as smallMaps,
} from "../assets/data/smallData";
import {
  collections as largeCollections,
  maps as largeMaps,
} from "../assets/data/largeData";
import {
  collections as extraLargeCollections,
  maps as extraLargeMaps,
} from "../assets/data/extraLargeData";
import {
  collections as extraExtraLargeCollections,
  maps as extraExtraLargeMaps,
} from "./data/extraExtraLargeData";
import {
  collections as mediumCollections,
  maps as mediumMaps,
} from "./data/mediumData";
import {
  collections as extraSmallCollections,
  maps as extraSmallMaps,
} from "./data/extraSmallData";

const DataMap = new Map<string, any>();
DataMap.set("small", {
  collections: smallCollections,
  maps: smallMaps,
  sizeInfo: {
    width: "/12 inches.png",
    height: "/8 inches.png",
    breadth: "/12 inches.png",
  },
  info: {
    generalInfo: {
      innerHeight: 78,
      innerDepth: 36,
      innerWidth: 72,
      pocketSum: 60,
    },
    detailInfo: [
      { height: 8, breadth: 12, width: 12, columns: 3, pockets: 24 },
      { height: 8, breadth: 12, width: 12, columns: 3, pockets: 24 },
      { height: 8, breadth: 12, width: 12, columns: 3, pockets: 24 },
    ],
  },
});

DataMap.set("large", {
  collections: largeCollections,
  maps: largeMaps,
  sizeInfo: {
    width: "/15 inches.png",
    height: "/18 inches.png",
    breadth: "/12 inches.png",
  },
  info: {
    generalInfo: {
      innerHeight: 78,
      innerDepth: 36,
      innerWidth: 72,
      pocketSum: 60,
    },
    detailInfo: [
      { height: 16, breadth: 12, width: 18, columns: 3, pockets: 24 },
      { height: 16, breadth: 12, width: 18, columns: 3, pockets: 24 },
      { height: 16, breadth: 12, width: 18, columns: 3, pockets: 24 },
    ],
  },
});

DataMap.set("extraLarge", {
  collections: extraLargeCollections,
  maps: extraLargeMaps,
  sizeInfo: {
    width: "/18 inches.png",
    height: "/16 inches.png",
    breadth: "/19 inches.png",
  },
  info: {
    generalInfo: {
      innerHeight: 78,
      innerDepth: 36,
      innerWidth: 72,
      pocketSum: 60,
    },
    detailInfo: [
      { height: 16, breadth: 19, width: 16, columns: 3, pockets: 24 },
      { height: 16, breadth: 19, width: 16, columns: 3, pockets: 24 },
    ],
  },
});

DataMap.set("extraExtraLarge", {
  collections: extraExtraLargeCollections,
  maps: extraExtraLargeMaps,
  sizeInfo: {
    width: "/24 inches.png",
    height: "/20 inches.png",
    breadth: "/19 inches.png",
  },
  info: {
    generalInfo: {
      innerHeight: 78,
      innerDepth: 36,
      innerWidth: 72,
      pocketSum: 60,
    },
    detailInfo: [
      { height: 20, breadth: 19, width: 24, columns: 3, pockets: 24 },
      { height: 20, breadth: 19, width: 24, columns: 3, pockets: 24 },
    ],
  },
});

DataMap.set("medium", {
  collections: mediumCollections,
  maps: mediumMaps,
  sizeInfo: {
    width: "/12 inches.png",
    height: "/13 inches.png",
    breadth: "/12 inches.png",
  },
  info: {
    generalInfo: {
      innerHeight: 78,
      innerDepth: 36,
      innerWidth: 72,
      pocketSum: 60,
    },
    detailInfo: [
      { height: 13, breadth: 12, width: 12, columns: 3, pockets: 24 },
      { height: 13, breadth: 12, width: 12, columns: 3, pockets: 24 },
      { height: 13, breadth: 12, width: 12, columns: 3, pockets: 24 },
    ],
  },
});
DataMap.set("extraSmall", {
  collections: extraSmallCollections,
  maps: extraSmallMaps,
  sizeInfo: {
    width: "/18 inches.png",
    height: "/8 inches.png",
    breadth: "/12 inches.png",
  },
  info: {
    generalInfo: {
      innerHeight: 78,
      innerDepth: 36,
      innerWidth: 72,
      pocketSum: 60,
    },
    detailInfo: [
      { height: 8, breadth: 12, width: 9, columns: 3, pockets: 24 },
      { height: 8, breadth: 12, width: 9, columns: 3, pockets: 24 },
      { height: 8, breadth: 12, width: 9, columns: 3, pockets: 24 },
    ],
  },
});

export default DataMap;
