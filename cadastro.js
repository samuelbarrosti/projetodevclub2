// ===============================
// FORMULÁRIO DE CADASTRO
// ===============================

const formulario = document.querySelector("form");

if (formulario) {
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nomeInput = document.querySelector(
      'input[type="text"]'
    );

    const emailInput = document.querySelector(
      'input[type="email"]'
    );

    const senhaInput = document.querySelector(
      'input[type="password"]'
    );

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (nome === "" || email === "" || senha === "") {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const resposta = await fetch(
        "http://localhost:3000/cadastro",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
          })
        }
      );

      const dados = await resposta.json();

      if (resposta.ok) {
        window.location.href = "confirmacao.html";
      } else {
        alert(
          dados.erro || "Erro ao criar cadastro"
        );
      }
    } catch (error) {
      console.error("Erro:", error);

      alert(
        "Não foi possível conectar ao servidor. Verifique se o Node está ligado."
      );
    }
  });
}


// ===============================
// EFEITO MATRIX
// ===============================

const canvas = document.getElementById("matrix");

if (canvas) {
  const ctx = canvas.getContext("2d");

  const tamanhoFonte = 16;

  let colunas = 0;
  let gotas = [];
  let intervaloMatrix;

  function ajustarMatrix() {
    const largura = window.innerWidth;
    const altura = window.innerHeight;

    canvas.width = largura;
    canvas.height = altura;

    colunas = Math.ceil(
      largura / tamanhoFonte
    );

    gotas = Array(colunas).fill(1);
  }

  function desenharMatrix() {
    ctx.fillStyle =
      "rgba(2, 6, 23, 0.08)";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.fillStyle = "#00ff99";
    ctx.font =
      `${tamanhoFonte}px monospace`;

    for (
      let indice = 0;
      indice < gotas.length;
      indice++
    ) {
      const caractere =
        String.fromCharCode(
          33 +
          Math.floor(Math.random() * 94)
        );

      const x =
        indice * tamanhoFonte;

      const y =
        gotas[indice] * tamanhoFonte;

      ctx.fillText(
        caractere,
        x,
        y
      );

      if (
        y > canvas.height &&
        Math.random() > 0.975
      ) {
        gotas[indice] = 0;
      }

      gotas[indice]++;
    }
  }

  ajustarMatrix();

  intervaloMatrix = setInterval(
    desenharMatrix,
    45
  );

  window.addEventListener(
    "resize",
    ajustarMatrix
  );
}