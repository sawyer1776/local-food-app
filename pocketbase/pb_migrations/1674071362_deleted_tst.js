migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("g4u1lyqh4z8rx9w");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "g4u1lyqh4z8rx9w",
    "created": "2023-01-18 19:49:12.630Z",
    "updated": "2023-01-18 19:49:12.630Z",
    "name": "tst",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oviwulvn",
        "name": "field",
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
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": null,
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
})
