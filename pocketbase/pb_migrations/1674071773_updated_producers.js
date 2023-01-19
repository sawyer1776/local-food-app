migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5akj8mva7bqg8s9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dyq4skeo",
    "name": "producer_name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5akj8mva7bqg8s9")

  // remove
  collection.schema.removeField("dyq4skeo")

  return dao.saveCollection(collection)
})
