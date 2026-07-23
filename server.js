const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());



function gerarSenha(){

    return Math.random()
    .toString(36)
    .slice(-8);

}



app.post("/cadastro", async (req,res)=>{


    const {nome,email}=req.body;


    const senhaTemporaria = gerarSenha();



    const transporter = nodemailer.createTransport({

        service:"gmail",

        auth:{
            user:process.env.EMAIL,
            pass:process.env.SENHA_EMAIL
        }

    });



    await transporter.sendMail({

        from:process.env.EMAIL,

        to:email,

        subject:"Bem-vindo ao DevClub 🚀",

        html:`

        <h1>Olá ${nome}</h1>

        <p>
        Sua conta foi criada com sucesso.
        </p>

        <p>
        Sua senha temporária é:
        </p>

        <h2>
        ${senhaTemporaria}
        </h2>

        <p>
        Recomendamos alterar sua senha no primeiro acesso.
        </p>

        `

    });



    res.json({

        sucesso:true

    });


});



app.listen(3000,()=>{

console.log("Servidor rodando na porta 3000");

});