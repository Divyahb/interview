const fragmentRegistry = {
  _registry: {},

  register(key, initFn) {
    this._registry[key] = initFn;
  },

  get(key) {
    return this._registry[key];
  },
};
