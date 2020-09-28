# Regioni - CAP - IT

A simple service that returns all the CAPs (zip codes) given a region name, or the region name given a CAP.

Dataset credits: https://github.com/matteocontrini/comuni-json

## API

#### Region2CAP

##### Request

`GET /region2cap?region=_REGION_`

##### Response

```json
{ "success": true, "region": _REGION_, "count": 239, "data": [] }
```

#### CAP2Region

##### Request

`GET /cap2region?cap=_CAP_`

##### Response

```json
{ "success": true, "cap": _CAP_, "region": "" }
```

## Examples

#### Region2CAP

`curl http://127.0.0.1:5000/region2cap\?region\="Basilicata"`

```json
{
  "success": true,
  "count": 131,
  "data": [
    "85010",
    "75011",
    "85011",
    "85010",
    "75010",
    ...
  ]
}
```

#### CAP2Region

`curl http://127.0.0.1:5000/cap2region\?cap\="47838"`

```json
{ "success": true, "cap": "47838", "region": "Emilia-Romagna" }
```
