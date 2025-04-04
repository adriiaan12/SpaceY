const express = require('express');
const router = express.Router();
const viajesService = require('./viajes-service');


router.get("/", async (req, res) => {
    try {
        const viajes = await viajesService.getAll();
        if (viajes.length == 0) {
            res.status(404).send({
                msg: 'No se encontraron viajes'
            });
        }
        else {
            res.status(200).send(viajes);
        }
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

router.post("/", async (req, res) => {
    const viajes = req.body;
    if (Object.keys(viajes).length == 0) {
        res.status(400).send({ msg: 'viaje está vacía' });
        
    }else if(Object.values(viajes).some(value => value === null || value === undefined || value.toString().trim() === '')){
        res.status(400).send({ msg: 'Alguno de los campos está vacio' });
    }
    else {
        try {
            await viajesService.add(viajes);
            res.status(200).json({ msg: "Viaje creado correctamente." });
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
});

router.delete('/', async (req, res) => {
    try {
        const result = await viajesService.removeAll();
        if(result.deletedCount == 0){
            return res.status(400).send({ msg: 'No se han encontrado viajes a eliminar' });
        }
        res.status(200).send({ msg: 'viajes eliminadas!' });
    } catch (error) {
        console.error("Error al eliminar viajes:", error);
        res.status(500).send({ msg: error.message });
    }
});

router.get("/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
        const viajes = await viajesService.get(_id);
        if (!viajes) {
            res.status(404).send({ msg: 'Viaje no encontrada' });
        }
        else {
            res.status(200).send(viajes);
        }
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

router.put("/:_id", async (req, res) => {
    const { _id } = req.params;
    const viajeData = req.body;
    try {
        const result = await viajesService.update(_id, viajeData);
        if (result.modifiedCount === 0) {
            return res.status(404).send({
                msg: "Viaje no encontrada o sin cambios."
            });
        }
        res.status(200).send({ msg: 'Viaje actualizada!' });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

router.delete('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        
        const result = await viajesService.remove(_id);
        console.log("Resultado de la eliminación:", result);

        if (!result) {
            return res.status(500).send({ msg: "Error en la eliminación, result es undefined" });
        }
        if (result.deletedCount === 0) {  // Suponiendo que usas MongoDB y devuelve deletedCount
            return res.status(404).send({ msg: 'Viaje no encontrada o ya eliminada.' });
        }
        return res.status(200).send({ msg: 'Viaje eliminada!' });
    } catch (error) {
        console.error("Error al eliminar viaje:",error);
        return res.status(500).send({ msg: error.message });
    }
});

module.exports = router;