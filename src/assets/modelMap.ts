interface ModelMapInterface {
  modelPath: string;
  offset: number;
}

const ModelMap = new Map<string, ModelMapInterface>();
ModelMap.set("small", {
  modelPath: "/models/RSmall.glb",
  offset: 0.325,
});
ModelMap.set("large", {
  modelPath: "/models/RLarge2.glb",
  offset: 0.43,
});
ModelMap.set("extraLarge", {
  modelPath: "/models/RExtraLarge_2.glb",
  offset: 0.65,
});
ModelMap.set("extraExtraLarge", {
  modelPath: "/models/RExtraExtraLarge.glb",
  offset: 0.8,
});
ModelMap.set("medium", {
  modelPath: "/models/RMedium.glb",
  offset: 0.55,
});
ModelMap.set("extraSmall", {
  modelPath: "/models/RExtraSmall_2.glb",
  offset: 0.47,
});

export default ModelMap;
