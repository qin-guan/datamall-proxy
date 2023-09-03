//https://nitro.unjs.io/config
export default defineNitroConfig({
  routeRules: {
    '/**': {
      proxy: 'http://datamall2.mytransport.sg/**'
    }
  }
});

