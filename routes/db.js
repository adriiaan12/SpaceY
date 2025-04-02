const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://adrisanalva:lm06p1Aa1AMSuFO4@pdp-pnet-2024-2025.n0ke9.mongodb.net/?retryWrites=true&w=majority&appName=pdp-pnet-2024-2025"

const dbName = "pdp-pnet-2024-2025"

const clientOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

const client = new MongoClient(uri, clientOptions);

let db;

async function connectDb() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Conexión correcta a la base de datos");
    } catch (error) {
        console.error("Error conectando a base de datos:", error);
        throw error;
    }
}

function getCollection(collectionName) {
    if (!db) {
        throw new Error("No hay conexión a la base de datos");
    }
    return db.collection(collectionName);
}


module.exports = {
    connectDb, getCollection
};