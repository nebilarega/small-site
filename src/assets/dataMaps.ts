import {
  collections as smallCollections,
  maps as smallMaps,
} from "../assets/smallData";
import {
  collections as largeCollections,
  maps as largeMaps,
} from "../assets/largeData";

const DataMap = new Map<string, any>();
DataMap.set("small", {
  collections: smallCollections,
  maps: smallMaps,
  sizeInfo: {
    width: "/small_info/12 inches.png",
    height: "/small_info/8 inches.png",
    breadth: "/small_info/12 inches.png",
  },
});

DataMap.set("large", {
  collections: largeCollections,
  maps: largeMaps,
  sizeInfo: {
    width: "/large_info/15 inches.png",
    height: "/large_info/18 inches.png",
    breadth: "/large_info/12 inches.png",
  },
});

export default DataMap;
