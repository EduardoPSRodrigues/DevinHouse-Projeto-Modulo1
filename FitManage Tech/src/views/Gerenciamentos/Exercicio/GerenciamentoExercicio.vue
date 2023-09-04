<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <h1>Gerenciamento de exercícios</h1>

    <v-form ref="form" @submit.prevent="handleAddExercises">
        <v-text-field label="Nome" variant="outlined"
            v-model="exerciseDescription" placeholder="Digite o nome do exerício" required></v-text-field>

            <span class="message-error">{{ errorInputExercises }}</span>

        <v-btn variant="tonal" color="green" type="submit">Cadastrar</v-btn>
    </v-form>

    <h2>Lista de Exercícios</h2>
    <ul>
      <li v-for="exercise in responseExercises" :key="exercise.id">
        {{ exercise.description }}
      </li>
    </ul>

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
            exerciseDescription: '',
            errorInputExercises: '',

            responseExercises: {},

            snackbar: false,
            timeout: 2000,
        }
    },
    mounted() {
        this.loadExercises()
    },
    methods: {
        loadExercises() {
            const token = localStorage.getItem('user_token')

            axios({
                url: 'http://localhost:3000/exercises',
                method: 'GET',
                headers: {
                    Authorization: `Bearen ${token}`
                }
            })
                .then((response) => {
                    this.responseExercises = response.data
                })
                .catch(() => {
                    alert('Houve uma falha ao carregar as informações.')
                })
        },
        handleAddExercises(){

            this.errorInputExercises = ''

            if (!this.exerciseDescription) this.errorInputExercises = 'O nome do exercício é obrigatório.'

            if (!this.errorInputExercises) {
                
                const token = localStorage.getItem('instagram_token')
    
                axios({
                url: 'http://localhost:3000/exercises',
                method: 'post',
                data: {
                  description: this.exerciseDescription,
                },
                headers: {
                  Authorization: `Bearen ${token}`
                }
              })
                .then(() => {
                  this.snackbar = true
                  this.exerciseDescription = ''
                  this.loadExercises()
                })
                .catch(() => {
                  alert('Houve um erro ao realizar o cadastro do exercício.')
                })
            }


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