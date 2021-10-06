const TOKEN = 'a6e37d6f93457ff28d74582ee8526d57';
const URI = 'https://api.openweathermap.org/data/2.5/weather';
const UNITS = 'metric';

export default {
  methods: {
    fetchWeatherApi(payload) {
      return new Promise((resolve, reject) => {
        let query = this.toQueryString({
          ...payload,
          appid: TOKEN,
          units: UNITS,
        })

        try {
          fetch(`${URI}${query}`)
            .then(res => res.json())
            .then(data => {
              resolve(data);
            })
        } catch (e) {
          reject(e);
        }
      })
    },
  }
}