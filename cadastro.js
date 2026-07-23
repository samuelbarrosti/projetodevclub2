const formulario = document.querySelector("form");


formulario.addEventListener("submit", async (e) => {

    e.preventDefault();


    // pegar valores dos campos
    const nome = document.querySelector(
        'input[type="text"]'
    ).value;


    const email = document.querySelector(
        'input[type="email"]'
    ).value;



    // validação simples
    if(nome === "" || email === ""){

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

                    email: email

                })

            }
        );



        const dados = await resposta.json();



        if(resposta.ok){


            // cadastro enviado e email disparado
            window.location.href = "confirmacao.html";


        } else {


            alert(
                dados.erro || "Erro ao criar cadastro"
            );


        }



    } catch(error){


        console.log("Erro:", error);


        alert(
            "Não foi possível conectar ao servidor. Verifique se o Node está ligado."
        );


    }


});