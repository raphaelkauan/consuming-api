const axios = require("axios");

async function findCep(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const res = await axios.get(url);
    return res.data;
}

module.exports = { findCep };
