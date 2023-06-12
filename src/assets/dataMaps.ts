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
});

DataMap.set("large", {
  collections: largeCollections,
  maps: largeMaps,
});

export default DataMap;
