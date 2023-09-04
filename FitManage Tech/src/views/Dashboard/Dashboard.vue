<!-- eslint-disable vue/multi-word-component-names -->

<template>
 <v-app>

    <p>Bem vindo, {{ usuarioName }}</p>

      <v-container>
        <v-row>
          <v-col cols="6">
            <v-card>
              <v-card-title>Card 1</v-card-title>
              <v-card-text>
                10 Alunos
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary">Adicionar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-card-title>Card 2</v-card-title>
              <v-card-text>
                10 Exercícios
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary">Adicionar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
</template>


<script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        posts: [],
        usuarioName: '',
      }
    },
    mounted() {
      this.loadPosts()
      this.usuarioName = localStorage.getItem('usuario_name');
    },
    methods: {
      loadPosts() {
        //Pegando o token no local storage
        const token = localStorage.getItem('usuario_token')
  
        axios({
          url: 'http://localhost:3000/dashboard',
          method: 'GET',
          //A rota é privada e tenho que passar o token para conseguir fazer o get
          headers: {
            Authorization: `Bearen ${token}`
          }
        })
        //Como no get a intenção é pegar dados, então tenho que criar uma variavel para armazenar as informações do get, sendo que
        //response.data é a resposta da minha requisição, posts é o nome da variavel que estão as informações no meu servidor
          .then((response) => {
            this.posts = response.data.posts
          })
          .catch(() => {
            alert('deu ruim')
          })
      },
    }
  }
  </script>


<style>
    *{
        margin: 0;
    }
</style>