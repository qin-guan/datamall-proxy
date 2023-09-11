import { FetchResponse } from 'ofetch'

const jsonPaths = [
  'ltaodataservice/BusArrivalv2',
  'ltaodataservice/BusStops',
]

function toCamel(o) {
  var newO, origKey, newKey, value
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === "object") {
        value = toCamel(value)
      }
      return value
    })
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value)
        }
        newO[newKey] = value
      }
    }
  }
  return newO
}

export default eventHandler((event) => {
  if (!jsonPaths.includes(event.context.params.proxy))
    return proxyRequest(event, `http://datamall2.mytransport.sg${event.path}`)

  const camel = 'camel' in getQuery(event)

  return fetchWithEvent(event, `http://datamall2.mytransport.sg${event.path}`)
    .then(async (response: FetchResponse<{}>) => {
      if (response.ok && camel) {
        return new Response(JSON.stringify(toCamel(await response.json())), response)
      }
      return response
    })
})
