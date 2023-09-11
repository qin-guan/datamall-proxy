# `datamall-proxy`

Simple proxy to LTA's DataMall service.

Created because DataMall does not support TLS, which makes it troublesome to use in Cloudflare Workers.

## Deployments

1. <https://datamall-proxy.netlify.app>
2. <https://datamall-proxy.vercel.app>

## Usage

The API mirrors the DataMall API exactly, with some built in features which may make your life easier.

```shell
curl --request GET \
  --url https://datamall-proxy.netlify.appltaodataservice/BusStops \
  --header 'AccountKey: $YOUR_ACCOUNT_KEY'
```

### Camelcase response

Pass `?camel` query parameter in and responses from the paths below will be transformed.

* `/ltaodataservice/BusArrivalv2`
* `/ltaodataservice/BusStops`

```shell
curl --request GET \
  --url https://datamall-proxy.netlify.appltaodataservice/BusStops?camel \
  --header 'AccountKey: $YOUR_ACCOUNT_KEY'
```
