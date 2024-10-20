// Connect to the MongoDB database
db = db.getSiblingDB('assignment-1');


db.phrases.drop()

// Create a collection and insert some initial documents
db.createCollection('phrases');
db.phrases.insertMany([
  {
    _id : "67138f3a9be5f44818fe6911",
    phrase: "Hi, I’m a phrase",
    status: "active",
    created_at: new Date("2024-05-23T15:58:35+00:00"),
    updated_at: new Date("2024-05-23T15:58:35+00:00"),
    translations: {
      fr: "Salut, je suis une phrase",
      es: "hola soy una frase"
    }
  },
  {
    _id : "67138f3a9be5f44818fe6912",
    phrase: "This is another user",
    status: "pending",
    created_at: new Date("2024-05-07T10:00:00+00:00"),
    updated_at: new Date("2024-06-01T10:00:00+00:00"),
    translations: {
      fr: "Ceci est une autre phrase",
      es: "Esta es otra frase"
    }
  },
  {
    _id : "67138f3a9be5f44818fe6913",
    phrase: "This is another phrase",
    status: "spam",
    created_at: new Date("2024-05-28T10:00:00+00:00"),
    updated_at: new Date("2024-06-01T10:00:00+00:00"),
    translations: {
      fr: "Ceci est une autre phrase",
      es: "Esta es otra frase"
    }
  },
  {
    _id : "67138f3a9be5f44818fe6914",
    phrase: "This is deleted phrase",
    status: "deleted",
    created_at: new Date("2024-06-06T10:00:00+00:00"),
    updated_at: new Date("2024-07-01T10:00:00+00:00"),
    translations: {
      fr: "Ceci est une autre phrase",
      es: "Esta es otra frase"
    }
  }
]);