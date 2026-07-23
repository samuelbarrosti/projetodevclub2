// Scroll suave ao clicar no menu
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {

    const href = this.getAttribute('href');

    // Só aplica scroll se for link interno (#)
    if (href.startsWith("#")) {
      e.preventDefault();

      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }

  });
});

const container = document.querySelector('.meteors');

if (container) {
  for (let i = 0; i < 20; i++) {
    const meteor = document.createElement('span');

    meteor.style.left = Math.random() * 100 + '%';
    meteor.style.top = Math.random() * 100 + '%';
    meteor.style.animationDelay = Math.random() * 2 + 's';
    meteor.style.animationDuration = (Math.random() * 2 + 1) + 's';

    container.appendChild(meteor);
  }
}

function mostrarRecuperacao() {
  document.getElementById("recuperacao").style.display = "block";
}

function enviarEmail() {
  const email = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem");

  if (email === "") {
    mensagem.innerText = "Digite um email válido!";
    mensagem.style.color = "red";
    return;
  }

  // Simulação de envio
  mensagem.innerText = "📧 Um email com uma nova senha foi enviado para " + email;
  mensagem.style.color = "green";
}


const codeElement = document.getElementById("code");

if (codeElement) {
  const text = `
function cadastrarUsuario() {
  const nome = "Dev";
  const origem = "Instagram";

  if (nome && origem) {
    console.log("Cadastro realizado com sucesso!");
  }
}

cadastrarUsuario();
`;

document.addEventListener("DOMContentLoaded", function () {

 
});
