migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5akj8mva7bqg8s9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3iljiywj",
    "name": "imgs",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 10,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5akj8mva7bqg8s9")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
