const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();


const app = express();


app.use(cors());
app.use(express.json());


// Gerar senha temporária
function gerarSenha(){

    return Math.random()
    .toString(36)
    .slice(-8);

}



// Rota cadastro

app.post("/cadastro", async (req, res)=>{


    const { nome, email } = req.body;


    if(!nome || !email){

        return res.status(400).json({

            erro:"Nome e email são obrigatórios"

        });

    }



    const senhaTemporaria = gerarSenha();



    try{


        const transporter = nodemailer.createTransport({

            service:"gmail",

            auth:{

                user:process.env.EMAIL,

                pass:process.env.SENHA

            }

        });



        // Testa conexão com Gmail

        await transporter.verify();



        console.log("Servidor de email conectado!");



        const envio = await transporter.sendMail({


            from:{

                name:"DevClub",

                address:process.env.EMAIL

            },


            to:email,


            subject:"Sua senha temporária - DevClub",


            html:`

            <div style="
            font-family:Arial;
            background:#020617;
            color:white;
            padding:30px;
            border-radius:10px;
            ">


            <h1 style="color:#00ff99">
            Bem-vindo ao DevClub ${nome}
            </h1>


            <p>
            Sua conta foi criada com sucesso.
            </p>


            <p>
            Sua senha temporária é:
            </p>


            <h2 style="color:#00e5ff">
            ${senhaTemporaria}
            </h2>


            <p>
            Altere sua senha após o primeiro acesso.
            </p>


            </div>

            `


        });



        console.log(
            "Email enviado:",
            envio.messageId
        );



        res.json({

            mensagem:"Email enviado com sucesso"

        });



    }catch(error){



        console.log("====================");

        console.log("ERRO AO ENVIAR EMAIL:");

        console.log(error.message);

        console.log("====================");



        res.status(500).json({

            erro:error.message

        });



    }



});





app.listen(3000,()=>{


    console.log(
        "Servidor rodando na porta 3000"
    );


});