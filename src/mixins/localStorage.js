export const PREFIX = 'WEATHER_WIDGET_';
export const CITIES = 'cities';

export default {
  data: () => ({
    storageKeys: [
      CITIES
    ]
  }),
  methods: {
    loadLocalStorage: function () {
      const storage = window.localStorage;
      if (!storage) {
        return;
      }

      this.storageKeys.forEach(key => {
        const storageData = storage.getItem(`${PREFIX}${key}`);
        if (storageData) {
          this[key] = JSON.parse(storageData);
        }
      })
    },
    saveStorage(key) {
      window.localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(this[key]));
    },
  }
};