const { getCollection } = require('./db');
const { ObjectId } = require('mongodb');
const Viajes = function () { };

Viajes.prototype.add = async (viajeData) => {
    const viajesCollection = await getCollection("viajes");
    return await viajesCollection.insertOne(viajeData);
};

Viajes.prototype.get = async (_id) => {
    const viajesCollection = await getCollection("viajes");
    return await viajesCollection.findOne({
        _id:
            ObjectId.createFromHexString(_id)
    });
};

Viajes.prototype.getAll = async () => {
    const viajesCollection = await getCollection("viajes");
    return await viajesCollection.find({}).toArray();
};

Viajes.prototype.update = async (_id, updatedViaje) => {
    const viajesCollection = await getCollection("viajes");
    return await viajesCollection.updateOne(
        { _id: ObjectId.createFromHexString(_id) }, { $set: updatedViaje }
    );
};

Viajes.prototype.remove = async (_id) => {
    const viajesCollection = await getCollection("viajes");
    return await viajesCollection.deleteOne({
        _id: ObjectId.createFromHexString(_id)
    });
};
Viajes.prototype.removeAll = async () => {
    const viajesCollection = await getCollection("viajes");
    return await viajesCollection.deleteMany({});
};

module.exports = new Viajes();
