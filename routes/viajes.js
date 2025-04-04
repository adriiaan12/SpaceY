const express = require('express');
const router = express.Router();
const viajesService = require('./viajes-service');


router.get("/", async (req, res) => {
    try {
        const viajes = await viajesService.getAll();
        if (viajes.length == 0) {
            res.status(404).send({
                msg: 'No se encontraron películas'
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
        res.status(400).send({ msg: 'La película está vacía' });
    }
    else {
        try {
            await viajesService.add(viajes);
            res.status(200).json({ msg: "Viaje creado correctamente." }); // ✅ Devuelve JSON
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
});

router.delete('/', async (req, res) => {
    try {
        await viajesService.removeAll();
        res.status(200).send({ msg: 'Películas eliminadas!' });
    } catch (error) {
        console.error("Error al eliminar películas:", error);
        res.status(500).send({ msg: error.message });
    }
});

router.get("/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
        const viajes = await viajesService.get(_id);
        if (!viajes) {
            res.status(404).send({ msg: 'Película no encontrada' });
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
                msg: "Película no encontrada o sin cambios."
            });
        }
        res.status(200).send({ msg: 'Película actualizada!' });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

router.delete('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        await viajesService.remove(_id);
        return res.status(200).send({ msg: 'Película eliminada!' });
    } catch (error) {
        console.error("Error al eliminar película:",error);
        return res.status(500).send({ msg: error.message });
    }
});

module.exports = router;