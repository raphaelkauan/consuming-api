const router = require("express").Router();
const { findCep } = require("../api/cep-api");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ceps = [
    "76977-000",
    "76954-000",
    "76950-000",
    "76934-000",
    "76930-000",
    "76870-000",
    "76970-000",
    "76870-000",
    "76890-000",
    "76880-000",
    "76960-000",
    "76864-000",
    "76960-000",
    "76934-000",
    "76801-000",
    "76900-000",
    "76870-000",
    "76890-000",
    "76820-000",
    "76850-000",
    "76980-000",
];

router.get("/register-ceps", async (req, res) => {
    try {
        const city = ceps.map(async (cep) => {
            const formatCep = cep.replace("-", "");
            return await findCep(formatCep);
        });

        const citys = await Promise.all(city);

        await Promise.all(
            citys.map((city) =>
                prisma.citys.create({
                    data: {
                        cep: city.cep,
                        logradouro: city.logradouro,
                        complemento: city.complemento,
                        bairro: city.bairro,
                        localidade: city.localidade,
                        uf: city.uf,
                        ibge: city.ibge,
                        gia: city.gia,
                        ddd: city.ddd,
                        siafi: city.siafi,
                    },
                })
            )
        );
        return res.json("Sucesso!");
    } catch (error) {
        console.log("Error!");
    }
});

module.exports = router;
