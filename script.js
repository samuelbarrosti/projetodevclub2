document.addEventListener("DOMContentLoaded", function () {
  /* ==================================================
     ROLAGEM SUAVE DO MENU
  ================================================== */

  const linksMenu = document.querySelectorAll("nav a");

  linksMenu.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");

      // Aplica a rolagem somente em links internos
      if (href && href.startsWith("#")) {
        event.preventDefault();

        const destino = document.querySelector(href);

        if (destino) {
          destino.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  /* ==================================================
     CRIAÇÃO DOS METEOROS
  ================================================== */

  const containerMeteoros = document.querySelector(".meteors");

  if (containerMeteoros) {
    for (let i = 0; i < 20; i++) {
      const meteoro = document.createElement("span");

      meteoro.style.left = Math.random() * 100 + "%";
      meteoro.style.top = Math.random() * 100 + "%";
      meteoro.style.animationDelay = Math.random() * 2 + "s";
      meteoro.style.animationDuration =
        Math.random() * 2 + 1 + "s";

      containerMeteoros.appendChild(meteoro);
    }
  }

  /* ==================================================
     FUNDO COM CÓDIGO DA PÁGINA DE CADASTRO
  ================================================== */

  const codeElement = document.getElementById("code");

  if (codeElement) {
    const textoCodigo = `
function cadastrarUsuario() {
  const nome = "Dev";
  const origem = "Instagram";

  if (nome && origem) {
    console.log("Cadastro realizado com sucesso!");
  }
}

cadastrarUsuario();
`;

    codeElement.textContent = textoCodigo;
  }

  /* ==================================================
     FOGO VERDE NOS CURSOS E DEPOIMENTOS
  ================================================== */

  const cardsComFogo = document.querySelectorAll(
    "#cursos .card, #depoimentos .card.depoimento"
  );

  console.log(
    "Cards com fogo encontrados:",
    cardsComFogo.length
  );

  cardsComFogo.forEach(function (card) {
    /*
     * Evita criar mais de um container de fogo
     * no mesmo card.
     */
    let containerFogo =
      card.querySelector(".fire-particles");

    if (!containerFogo) {
      containerFogo = document.createElement("div");
      containerFogo.className = "fire-particles";
      containerFogo.setAttribute("aria-hidden", "true");

      card.appendChild(containerFogo);
    }

    let intervaloFogo = null;
    let fogoAtivo = false;
    const temporizadores = [];

    function criarParticula() {
      if (!fogoAtivo) {
        return;
      }

      const particula = document.createElement("span");
      particula.className = "fire-particle";

      const larguraCard = card.offsetWidth;
      const alturaCard = card.offsetHeight;

      /*
       * O container de partículas usa inset: -30px.
       * Por isso, o card começa 30px depois do início
       * do container.
       */
      const margem = 30;

      // 0 = cima, 1 = direita, 2 = baixo, 3 = esquerda
      const lado = Math.floor(Math.random() * 4);

      let posicaoX;
      let posicaoY;
      let movimentoX;
      let movimentoY;
      let rotacao;

      switch (lado) {
        /* Borda superior */
        case 0:
          posicaoX =
            margem + Math.random() * larguraCard;

          posicaoY = margem;

          movimentoX =
            Math.random() * 30 - 15;

          movimentoY =
            -(Math.random() * 45 + 25);

          rotacao =
            Math.random() * 20 - 10;

          break;

        /* Borda direita */
        case 1:
          posicaoX =
            margem + larguraCard;

          posicaoY =
            margem + Math.random() * alturaCard;

          movimentoX =
            Math.random() * 45 + 25;

          movimentoY =
            Math.random() * 24 - 12;

          rotacao =
            Math.random() * 20 + 80;

          break;

        /* Borda inferior */
        case 2:
          posicaoX =
            margem + Math.random() * larguraCard;

          posicaoY =
            margem + alturaCard;

          movimentoX =
            Math.random() * 30 - 15;

          movimentoY =
            Math.random() * 45 + 25;

          rotacao =
            Math.random() * 20 + 170;

          break;

        /* Borda esquerda */
        default:
          posicaoX = margem;

          posicaoY =
            margem + Math.random() * alturaCard;

          movimentoX =
            -(Math.random() * 45 + 25);

          movimentoY =
            Math.random() * 24 - 12;

          rotacao =
            Math.random() * 20 - 90;
      }

      const larguraParticula =
        Math.random() * 7 + 5;

      const alturaParticula =
        larguraParticula * 1.7;

      const duracao =
        Math.random() * 0.45 + 0.55;

      particula.style.left =
        posicaoX + "px";

      particula.style.top =
        posicaoY + "px";

      particula.style.setProperty(
        "--particle-width",
        larguraParticula + "px"
      );

      particula.style.setProperty(
        "--particle-height",
        alturaParticula + "px"
      );

      particula.style.setProperty(
        "--particle-duration",
        duracao + "s"
      );

      particula.style.setProperty(
        "--particle-x",
        movimentoX + "px"
      );

      particula.style.setProperty(
        "--particle-y",
        movimentoY + "px"
      );

      particula.style.setProperty(
        "--particle-middle-x",
        movimentoX * 0.5 + "px"
      );

      particula.style.setProperty(
        "--particle-middle-y",
        movimentoY * 0.5 + "px"
      );

      particula.style.setProperty(
        "--particle-rotation",
        rotacao + "deg"
      );

      containerFogo.appendChild(particula);

      particula.addEventListener(
        "animationend",
        function () {
          particula.remove();
        }
      );
    }

    function iniciarFogo() {
      if (fogoAtivo) {
        return;
      }

      fogoAtivo = true;

      /*
       * Cria várias partículas imediatamente,
       * para o efeito aparecer sem atraso.
       */
      for (let i = 0; i < 18; i++) {
        const temporizador = window.setTimeout(
          function () {
            criarParticula();
          },
          i * 30
        );

        temporizadores.push(temporizador);
      }

      /*
       * Continua criando partículas enquanto
       * o mouse estiver sobre o card.
       */
      intervaloFogo = window.setInterval(
        criarParticula,
        55
      );
    }

    function pararFogo() {
      fogoAtivo = false;

      if (intervaloFogo) {
        window.clearInterval(intervaloFogo);
        intervaloFogo = null;
      }

      temporizadores.forEach(function (temporizador) {
        window.clearTimeout(temporizador);
      });

      temporizadores.length = 0;

      /*
       * Aguarda as últimas partículas terminarem
       * antes de limpar o container.
       */
      window.setTimeout(function () {
        containerFogo.replaceChildren();
      }, 900);
    }

    card.addEventListener("mouseenter", iniciarFogo);
    card.addEventListener("mouseleave", pararFogo);

    /*
     * Também funciona ao navegar pelo teclado.
     */
    card.addEventListener("focusin", iniciarFogo);
    card.addEventListener("focusout", pararFogo);
  });
});

/* ==================================================
   RECUPERAÇÃO DE SENHA
================================================== */

function mostrarRecuperacao() {
  const recuperacao =
    document.getElementById("recuperacao");

  if (recuperacao) {
    recuperacao.style.display = "block";
  }
}

function enviarEmail() {
  const campoEmail =
    document.getElementById("email");

  const mensagem =
    document.getElementById("mensagem");

  if (!campoEmail || !mensagem) {
    return;
  }

  const email = campoEmail.value.trim();

  if (email === "") {
    mensagem.innerText =
      "Digite um e-mail válido!";

    mensagem.style.color = "red";
    return;
  }

  mensagem.innerText =
    "📧 Um e-mail com uma nova senha foi enviado para " +
    email;

  mensagem.style.color = "green";
}