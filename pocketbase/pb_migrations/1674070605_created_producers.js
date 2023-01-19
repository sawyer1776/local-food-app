migrate((db) => {
  const collection = new Collection({
    "id": "5akj8mva7bqg8s9",
    "created": "2023-01-18 19:36:45.380Z",
    "updated": "2023-01-18 19:36:45.380Z",
    "name": "producers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "udtnteiz",
        "name": "location",
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
        "id": "3iljiywj",
        "name": "imgs",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": []
        }
      },
      {
        "system": false,
        "id": "qp4miiug",
        "name": "owner_id",
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
        "id": "mqmqqaci",
        "name": "about_description",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "2ecplcpd",
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
        "id": "jmhz9o8i",
        "name": "tagline",
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
        "id": "wrqhzovc",
        "name": "public_email",
        "type": "email",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "mnpzoz3j",
        "name": "public_phone",
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
        "id": "9mxrbs9h",
        "name": "show_contact",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("5akj8mva7bqg8s9");

  return dao.deleteCollection(collection);
})
