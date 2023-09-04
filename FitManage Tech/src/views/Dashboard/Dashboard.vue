<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <v-app>

        <p>Bem vindo, {{ userName }}</p>

        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-card>
                        <!-- <v-card-title>Card 1</v-card-title> -->
                        <v-card-text>
                            {{ responseDashboard.amount_students }} Aluno(s)
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" :to="{name: 'GerenciamentoAlunos'}">Adicionar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card>
                        <!-- <v-card-title>Card 2</v-card-title> -->
                        <v-card-text>
                            {{ responseDashboard.amount_exercises }} Exercício(s)
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" :to="{ name: 'GerenciamentoExercicio' }">Adicionar</v-btn>
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
            userName: '',

            responseDashboard: {
                //amount_students: "",
                // amount_exercises: ""
            },

        }
    },
    mounted() {
        this.loadDashboard()
        this.userName = localStorage.getItem('user_name');
    },
    methods: {
        loadDashboard() {
            //Pegando o token no local storage
            const token = localStorage.getItem('user_token')

            axios({
                url: 'http://localhost:3000/dashboard',
                method: 'GET',
                headers: {
                    Authorization: `Bearen ${token}`
                }
            })
                .then((response) => {
                    this.responseDashboard = response.data
                })
                .catch(() => {
                    alert('Houve uma falha ao carregar as informações.')
                })
        },
    }
}
</script>


<style>
* {
    margin: 0;
}
</style>