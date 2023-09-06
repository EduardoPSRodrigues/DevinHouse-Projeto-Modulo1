<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div  class="d-flex justify-space-between mb-6">
    <h1>Gerenciamento de ALUNOS</h1>
    <v-btn variant="tonal" color="orange" type="submit" :to="{name: 'CadastroNovoAluno'}">Novo</v-btn>
    </div>

    <v-form ref="form" @submit.prevent="handleFilterStudents">
        <v-text-field label="Nome" variant="outlined"
            v-model="student" placeholder="Digite o nome do aluno" required></v-text-field>

        <v-btn variant="tonal" color="green" type="submit">Buscar</v-btn>
    </v-form>

    <h2>Lista de Alunos</h2>
    <ul>
      <li v-for="exercise in responseStudents" :key="exercise.id">
        {{ exercise.description }}
      </li>
    </ul>


    <v-table>
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.description }}</td>
          <td>
            <v-btn @click="() => createExercise(post.id)">Mostrar Treino</v-btn>
            <v-btn @click="() => showExercise(post.id)">Ver</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>









    <v-snackbar v-model="snackbar" :timeout="timeout">
        Exercício cadastrado com sucesso!

        <template v-slot:actions>
            <v-btn color="red" variant="text" @click="snackbar = false">
                Fechar
            </v-btn>
        </template>
    </v-snackbar>
</template>


<script>
import axios from 'axios'

export default {
    data() {
        return {
            student: '',
            errorInputExercises: '',

            responseStudents: {},

            snackbar: false,
            timeout: 2000,

            posts: [],
        }
    },
    mounted() {
        this.loadStudents()
    },
    methods: {
        loadStudents() {
            const token = localStorage.getItem('user_token')

            axios({
                url: 'http://localhost:3000/students',
                method: 'GET',
                headers: {
                    Authorization: `Bearen ${token}`
                }
            })
                .then((response) => {
                    this.responseStudents = response.data
                })
                .catch(() => {
                    alert('Houve uma falha ao carregar as informações.')
                })
        },
        handleFilterStudents(){

            this.errorInputExercises = ''

        },
    }
}
</script>


<style scoped>
.message-error {
    color: red;
    margin: 4px;
    font-size: small;
}
</style>