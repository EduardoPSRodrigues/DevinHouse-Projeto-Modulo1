<!-- eslint-disable vue/multi-word-component-names -->

<!-- HTML -->
<template>
    <form @submit.prevent="handleLogin" class="form-login">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"
        alt="Logotipo do instagram">
  
      <div class="input-area">
        <input type="text" placeholder="Telefone, nome do usuário ou e-mail" v-model="email">
      </div>
  
      <div class="input-area">
        <input type="password" placeholder="Senha" v-model="password">
      </div>
  
      <button type="submit">Entrar</button>
  
      <div class="error-box">
        <ul>
          <li v-if="errorInputEmail">{{ errorInputEmail }}</li>
          <li v-if="errorInputPassword">{{ errorInputPassword }}</li>
        </ul>
      </div>
  
      <p><router-link to="/cadastro">Cadastre-se</router-link></p>
  
      <a id="esqueceu-senha">Esqueceu a senha?</a>
      <span id="imagem-carregando" hidden></span>
  
    </form>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        email: '',
        password: '',
  
        errorInputEmail: '',
        errorInputPassword: '',
      }
    },
    methods: {
      handleLogin() {
  
        this.errorInputEmail = ''
        this.errorInputPassword = ''
  
        if (!this.email) this.errorInputEmail = 'Digite um e-mail válido.'
        if (!this.password) this.errorInputPassword = 'Senha incorreta.'
  
        if (!this.errorInputEmail && !this.errorInputPassword) {
          //Fazendo uma requisição para verificar a informação no banco de dados
          axios({
            url: 'http://localhost:3000/api/login',
            method: 'POST',
            data: {
              email: this.email,
              password: this.password,
            }
          })
          .then((response) => {
            
            // Usei o localStorage para salvar informações do usuário, sendo que o token pode ser armazenado, pois o 
            // usuário não sabe decodificar o código
            localStorage.setItem("instagram_token", response.data.token)
            localStorage.setItem("instagram_name", response.data.name)
  
            this.$router.push('/home')
            console.log("Logado com sucesso")
          })
            .catch(() => {
                alert("Falha ao realizar login")
            })
        }
      }
    },
  }
  </script>
  
  <!-- Estilização -->
  
  <style scoped>
  .error-box {
    background-color: tomato;
    width: 80%;
    color: #fff;
    margin: 4px;
  
  }
  
  .form-login {
    margin: 0 auto;
    width: 40%;
  
    border-radius: 4px;
    border: 2px solid #f2f2f2;
  
    display: flex;
    flex-direction: column;
    gap: 16px;
  
    align-items: center;
    padding: 12px;
  }
  
  img {
    width: 250px;
  }
  
  input {
    background-color: #fafafa;
    height: 40px;
    width: 80%;
  
    border-radius: 8px;
    border: 1px solid #f2f2f2;
  
    outline: none;
  }
  
  .input-area {
    display: flex;
    flex-direction: column;
  
    width: 80%;
  }
  
  .input-area input {
    width: 100%;
  }
  
  button {
    background-color: #4bb4f8;
    color: white;
  
    font-size: 16px;
  
    height: 40px;
    width: 80%;
  
    border-radius: 8px;
    border: none;
  }
  
  button:hover {
    background-color: #2985c2;
  }
  
  a {
    color: #707b88;
    font-size: 14px;
  }
  
  .input-error {
    border-color: red;
  }
  </style>
  
  
  <!-- Informações do projeto
  
  * Para criar uma função de submissão no formulário, basta colocar @submit="" e declarar a função
  * Quando tem um formulário, não precisa colocar o @submit no botão, pois estará vinculado no formulário, 
    coloca @click ou @submit quando for um botão independente. 
  * @submit.prevent significa que o submit não vai mais recarregar a tela, seria como o preventDefault no java
  * Quando o if tem apenas 1 linha, pode omitir as chaves e deixar tudo na mesma linha
  * Caso o email ou senha seja preenchido, o campo this. errorInputEmail = '' faz limpar a variavel e sumir com o erro na tela
  * v-if="errorInputEmail": Essa é uma diretiva do Vue.js chamada v-if. Ela é usada para renderizar condicionalmente 
    um elemento com base em uma expressão booleana. No caso, o elemento <li> só será renderizado se o valor de 
    errorInputEmail for avaliado como verdadeiro (ou seja, não for nulo, vazio, falso, etc.).
  * button :disabled="!email && !password"  vai deixar o botão desabilitado até esses campos terem informação.
  * Como esse código é um componente, tem que importar ele no APP.vue, registrar em export default { 
    components:{LoginInstagram}, e colocar a tag no HTML.
  * <p><router-link to="/cadastro">Cadastre-se</router-link></p> significa que dentro da tag p estou colocando um link 
    para quando clicar na palavra Cadastre-se, o usuário ir para a tela de cadastro, coloca sempre o nome do patch que foi
    configurado no router
  * Dentro de uma função no methods, para ser direcionado a outra tela usa-se this.$router.push('/home'), dentro das aspas 
    coloca o path para ser direcionado
  -->