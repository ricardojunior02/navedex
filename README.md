Ola segue aqui algumas instruções para testar essa api

1- Você precisara de uma imagem postgres com um banco chamado navedex,
assim como outras credencias necessárias, no arquivo .env.

# OBS: por ser um teste optei por manter o .env ao subir para o Github

2-Para rodar a aplicação basta rodar o script com npm run dev ou yarn dev.

3-Após a conexão com o banco para rodar as migrations basta rodar o script com
npm run run:migrations ou yarn run:migrations.

4-Segue nesse repositório as configurações que utilizei no Insomnia para testar, caso alguma duvida
segue um breve passo a passo, ou entre em contato por gentileza. ricardojunior199502@gmail.com

5-Para criar uruários basta acessar a rota create-user e informar um json

# EXEMPLO

{
"email": "teste2@teste.com",
"password": "123456"
}

6-Para fazer login e ter acesso as demais rotas deve-se fazer login na rota create-session,
o retorno será um json contendo o jwt necessário para ter acesso as demais rotas, que deve ser fornecido
como um Bearer token

# OBS: TODAS AS ROTAS A PARTIR DESSA SERÁ NECESSÁRIO FORNECER O TOKEN

# EXEMPLO

{
"email": "teste2@teste.com",
"password": "123456"
}

7-Para criar projetos basta acessar a rota projects-create e fornecer um token, caso contrário não será
possível ter acesso a criação, segue um exemplo do body a ser fornecido.
Pode ser fornecido um array de id dos navers caso eles ja existam e somente será possivel
adicionar navers pertencentes ao usuário que fez o login

# EXEMPLO

{
"name": "navedex",
"navers": []
}

8-Para listar um project basta fornecer seu id na rota /projects-show/:id , tambem deve ser um pertencente ao usuário.

9-Para listar todos os navers basta acessar a rota /projects-list, e filtar por nome deve-se
fornecer name e valor a ser filtrado

10-Para deletar um project deve-se acessar a rota /projects-delete/:id fornecendo um id

11-Para atualizar projetos basta acessar a rota /projects-update/:id fornecendo um id, e um json em seu body,
que pode receber name e ou um array de id dos navers

# EXEMPLO

{
"name": "novo projeto navedex",
"navers": []
}

12- Para criar navers basta acessar a rota /navers-create e fornecer um json com as seguintes informações do exemplo,
onde pode-se fornecer os id's dos projetos ao qual ele participa.

# OBS: As datas devem ser fornecidas no seguinte formato YYYY-MM-DD

# EXEMPLO

{
"name": "nave rs",
"birthdate": "1995-02-02",
"admission_date": "2021-03-30",
"job_role": "Desenvolvedor Node.js",
"projects": []
}

13-Para ver as informções de um naver basta acessar a rota /navers-show/:id fornecendo um id

14-Para listar todos os navers basta acessar a rota /navers-list, onde podemos tbm filtrar por nome, tempo de casa
e função, deve-se fornecer nos query params um por vez.
14.1-Para filtrar por nome deve-se fornecer o campo name e o valor a ser filtrado
14.2-Para filtrar por tempo de casa deve-se fornecer o campo time como valor a ser filtrado deve-se fornecer o tempo em meses
14.3-Para filtrar por função deve-se fornecer o campo job_role e o valor a ser filtrado

15-Para deletar um naver deve-se acessar a rota /navers-delete/:id e fornecer um id na rota

16-Para atualizar um naver deve-se acessar a rota /navers-update/:id e fornecer um id na rota, e um
json com as informações como no exemplo.

# EXEMPLO

{
"name": "nave rs",
"birthdate": "1995-02-02",
"admission_date": "2021-03-30",
"job_role": "Desenvolvedor Node.js",
"projects": []
}
