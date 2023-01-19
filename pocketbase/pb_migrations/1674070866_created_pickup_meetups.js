migrate((db) => {
  const collection = new Collection({
    "id": "wkdrle50rq6yedu",
    "created": "2023-01-18 19:41:06.563Z",
    "updated": "2023-01-18 19:41:06.563Z",
    "name": "pickup_meetups",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jlwxzrqe",
        "name": "pickup",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "lgfb6ji8",
        "name": "day",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 7,
          "values": [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ]
        }
      },
      {
        "system": false,
        "id": "c7hpj3mf",
        "name": "location_name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "g48qf5pl",
        "name": "address",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ss3i8zzr",
        "name": "one_time_date",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "ruxxybvs",
        "name": "start_time",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "uafuqtrj",
        "name": "end_time",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "bmqmhrvg",
        "name": "producer_id",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "xqunsvrc",
        "name": "show_address_public",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "hyull40s",
        "name": "address_link",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("wkdrle50rq6yedu");

  return dao.deleteCollection(collection);
})
