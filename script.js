async function consultarCEP() {
    const cep = document.getElementById("cep").value;
    try {
        const response = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );
        const data = await response.json();
        console.log(data);
        if (data.logradouro) {
            document.getElementById("logradouro").innerText = data.logradouro;
        }
        if (data.bairro) {
            document.getElementById("bairro").innerText = data.bairro;
        }
        if (data.uf) {
            document.getElementById("uf").innerText = data.uf;
        }
    } catch (error) {
        alert(error.message);
    }
    previsao();
}


async function previsao() {
    const lat = document.getElementById("latitude").value;
    const long = document.getElementById("longitude").value;
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`
        );
        const data = await response.json();
        console.log(data);
        if (data.hourly && data.hourly.temperature_2m && data.hourly.temperature_2m.length > 0) {
            
            const temperaturaAtual = data.hourly.temperature_2m[data.hourly.temperature_2m.length - 1];
            document.getElementById("resultadoPrevisao").innerText = `Previsão de tempo de acordo com a região:  ${temperaturaAtual}°C`;
        } else {
            throw new Error('Dados de previsão do tempo não encontrados.');
        }
    } catch (error) {
        alert(error.message);
    }
}
