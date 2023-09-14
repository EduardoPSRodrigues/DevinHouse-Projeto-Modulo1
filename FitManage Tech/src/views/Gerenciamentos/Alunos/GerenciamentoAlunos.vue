<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div  class="d-flex justify-space-between mb-6">
    <h1>Gerenciamento de ALUNOS</h1>
    <v-btn variant="tonal" color="orange" type="submit" :to="{name: 'CadastroNovoAluno'}">Novo</v-btn>
    </div>

    <v-form ref="form" @submit.prevent="handleFilterStudents">
        <v-text-field label="Nome" variant="outlined"
            v-model="studentSearch" placeholder="Digite o nome do aluno" required></v-text-field>

        <v-btn variant="tonal" color="green" type="submit">Buscar</v-btn>
    </v-form>

    <h2>Lista de Alunos</h2>
    <!-- <ul>
      <li v-for="exercise in responseStudents" :key="exercise.id">
       
      </li>
    </ul> -->


    <v-table>
      <thead>
        <tr>
          <th class="text-center">Nome</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="responseStudent in filteredStudents" :key="responseStudent.id">
          <td>{{ responseStudent.name }}</td>
          <td>
            <v-btn @click="() => createExercise(responseStudent.id, responseStudent.name )">Montar Treino</v-btn>
            <v-btn @click="() => showExercise(responseStudent.id, responseStudent.name)">Ver</v-btn>
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
            studentSearch: '',
            errorInputExercises: '',

            responseStudents: [],

            snackbar: false,
            timeout: 2000,
        }
    },
    mounted() {
        this.loadStudents()
    },
    computed: {
    filteredStudents() {
      // Filtrar os alunos com base no valor de studentSearch
      const searchTerm = this.studentSearch.trim().toLowerCase()
      return this.responseStudents.filter(student => {
        return student.name.toLowerCase().includes(searchTerm)
      })
    },
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
                    this.responseStudents = response.data.students
                })
                .catch(() => {
                    alert('Houve uma falha ao carregar as informações.')
                })
        },
        handleFilterStudents(){

            this.errorInputExercises = ''

        },
        createExercise(id, name){
                localStorage.setItem("student_id", id)
                localStorage.setItem("student_name", name)

                this.$router.push('/cadastro/treino')
        },
        showExercise(id, name){
                localStorage.setItem("student_id", id)
                localStorage.setItem("student_name", name)

                this.$router.push('/visualizacaotreinos')

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