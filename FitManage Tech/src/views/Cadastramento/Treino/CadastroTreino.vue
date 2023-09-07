<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <v-form @submit.prevent="handleCreateNewStudent" class="my-5 form-login">


        <h2 class="my-3">Tela de Cadastro TREINO</h2>

        <div class="form-element">
            <v-select 
                v-model="selectedExerciseId" 
                :items="responseExercises" 
                item-value="id"
                label="Qual o exercício"
                >
        </v-select>

        

        <span class="message-error">{{ this.errors.selectedExerciseId }}</span>
        </div>

        <div class="form-element">
            <label for="repetitions">Repetições:</label>
            <input class="form-input" type="number" id="repetitions" v-model="repetitions">
            <span class="message-error">{{ this.errors.repetitions }}</span>
        </div>

        <div class="form-element">
            <label for="weight">Quilos:</label>
            <input class="form-input" type="number" id="weight" v-model="weight">
            <span class="message-error">{{ this.errors.weight }}</span>
        </div>

        <div class="form-element">
            <label for="break_time">Pausa:</label>
            <input class="form-input" type="time" id="break_time" v-model="break_time">
            <span class="message-error">{{ this.errors.break_time }}</span>
        </div>

        <div class="form-element">
            <v-select 
                v-model="selectDay" 
                :items="dayOfWeek" 
                label="Escolha um dia da semana">
            </v-select>
        </div>

        <div class="form-element">
            <v-textarea
                clearable
                label="Observações para esse treino."
                variant="solo-filled"
                v-model="observation"
                >
            </v-textarea>
        </div>

        <v-btn type="submit" class="text-none text-subtitle-1" variant="outlined">
            Cadastrar
        </v-btn>

        <router-link :to="{ name: 'GerenciamentoAlunos' }">
            <v-btn class="text-none text-subtitle-1" variant="outlined">
                Voltar
            </v-btn>
        </router-link>

    </v-form>

    <v-snackbar v-model="snackbarSuccess" :timeout="timeout">
        Aluno cadastrado com sucesso!

        <template v-slot:actions>
            <v-btn color="red" variant="text" @click="snackbarSuccess = false">
                Fechar
            </v-btn>
        </template>
    </v-snackbar>

    <v-snackbar v-model="snackbarError" :timeout="timeout">
        Não foi possível criar o treino nesse momento. Por favor, tente mais tarde.

        <template v-slot:actions>
            <v-btn color="red" variant="text" @click="snackbarError = false">
                Fechar
            </v-btn>
        </template>
    </v-snackbar>
</template>
  
<script>
import * as yup from 'yup'
import { captureErrorYup } from "../../../utils/captureErrorYup";
import axios from 'axios'

export default {
    data() {
        return {
            selectedExercise: null,
            selectedExerciseId: null,
            student_id: '',

            responseExercises: [],
            

            repetitions: null,
            weight: null,
            break_time: '',
            observation: '',
            
            selectDay: null,
            dayOfWeek: [
                'Domingo',
                'Segunda-feira',
                'Terça-feira',
                'Quarta-feira',
                'Quinta-feira',
                'Sexta-feira',
                'Sábado',],

            errors: {},

            snackbarSuccess: false,
            snackbarError: false,
            timeout: 2000,
        }
    },

    mounted() {
        this.loadExercises()
        this.loadDayWeek()
        this.student_id = localStorage.getItem('student_id');
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
                    this.responseExercises = response.data.map((item) => item.description);   

        })
                .catch(() => {
                    alert('Houve uma falha ao carregar as informações.')
                })
        },
        loadDayWeek(){
            const hoje = new Date().getDay(); // Obtém o dia da semana atual (0 = Domingo, 1 = Segunda, etc.)
            this.selectDay = this.dayOfWeek[hoje];
        },

        handleCreateNewStudent() {

            try {

                const schema = yup.object().shape({
                    selectedExerciseId: yup.string().required('Por favor, selecione o exercício.'),
                    repetitions: yup.number().typeError('A repetição deve ser um número válido.').positive('O número não pode ser zero ou negativo.').required('Insira no mínimo uma repetição.'),
                    weight: yup.number().typeError('O peso deve ser um número válido.').positive('O peso não pode ser zero ou negativo.').required('O peso é obrigatório.'),
                    break_time: yup.string().required('O tempo de pausa é obrigatório.'),
                })

                schema.validateSync({
                    selectedExerciseId: this.selectedExerciseId,
                    repetitions: this.repetitions,
                    weight: this.weight,
                    break_time: this.break_time,
                }, { abortEarly: false })

                axios({
                    url: 'http://localhost:3000/workouts',
                    method: 'POST',
                    data: {
                        student_id: this.student_id,
                        exercise_id: this.selectedExerciseId,
                        repetitions: this.repetitions,
                        weight: this.weight,
                        break_time: this.break_time,
                        observations: this.observation,
                        day: this.selectDay,
                    }
                })
                    .then(() => {
                        this.snackbarSuccess = true
                        this.repetitions = ''
                        this.weight = ''
                        this.break_time = ''
                        this.errors = ''
                    })
                    .catch((error) => {
                        console.log(error)
                        if (error.response?.data?.error) {
                            alert(error.response.data.error)
                        } else {
                            this.snackbarError = true
                        }
                    })
            } catch (error) {
                if (error instanceof yup.ValidationError) {
                    this.errors = captureErrorYup(error)
                }
            }
        },
    },
}
</script>
  
<style scoped>
.message-error {
    color: red;
    margin: 4px;
    font-size: small;
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

.form-select {
    height: 40px;
    background-color: #fafafa;
    width: 100%;

    border-radius: 8px;
    border: 1px solid #f2f2f2;

    outline: none;
}

input {
    background-color: #fafafa;
    height: 40px;
    width: 80%;

    border-radius: 8px;
    border: 1px solid #f2f2f2;

    outline: none;
}

.form-element {
    display: flex;
    flex-direction: column;

    width: 80%;
}

.form-element input {
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

a,
p {
    color: #707b88;
    font-size: 14px;
}
</style>
