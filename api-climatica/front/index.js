const button = document.querySelector("button");

async function criar() {
    const nome = document.getElementById("nome").value;
    const estado = document.getElementById("estado").value;
    const pais = document.getElementById("pais").value;

    try {
        const resposta = await fetch('http://localhost:3000/locais', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, estado, pais })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar local");
        }

        const dados = await resposta.json();
        console.log("Local cadastrado com sucesso:", dados);
        alert("Local cadastrado com sucesso!");

    } catch (error) {
        console.error("Erro:", error);
        alert("Falha ao cadastrar local.");
    }
}

button.addEventListener("click", criar);
