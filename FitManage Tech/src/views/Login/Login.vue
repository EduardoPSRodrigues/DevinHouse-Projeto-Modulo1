<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <v-form @submit.prevent="handleLogin" class="form-login">

        <v-img :width="252" aspect-ratio="16/9" cover alt="Logotipo da FitManage Tech"
            src="data:image/png;base64,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"></v-img>


        <div class="input-area">
            <input type="text" placeholder="Digite o e-mail" v-model="email">
            <span class="message-error">{{ this.errors.email }}</span>
        </div>

        <div class="input-area">
            <input type="password" placeholder="Digite a senha" v-model="password">
            <span class="message-error">{{ this.errors.password }}</span>
        </div>

        <button type="submit">Entrar</button>

        <p> Ainda não tem conta? <b><router-link class="text-decoration-none"
                    :to="{ name: 'CadastroUsuario' }">Cadastre-se</router-link></b></p>

    </v-form>
</template>
  
<script>
import * as yup from 'yup'
import { captureErrorYup } from "../../utils/captureErrorYup";
import axios from 'axios'

export default {
    data() {
        return {
            email: '',
            password: '',

            errors: {},
        }
    },
    methods: {
        handleLogin() {

            try {

                const schema = yup.object().shape({
                    email: yup.string().email('O e-mail não é válido.').required('O e-mail é obrigatório.'),
                    password: yup.string().min(5, "A senha deve ter no mínimo 5 caracteres.").required('A senha é obrigatória.'),
                })

                schema.validateSync({
                    email: this.email,
                    password: this.password,
                }, { abortEarly: false })

                axios({
                    url: 'http://localhost:3000/sessions',
                    method: 'POST',
                    data: {
                        email: this.email,
                        password: this.password,
                    }
                })
                    .then((response) => {
                        localStorage.setItem("usuario_name", response.data.name)
                        localStorage.setItem("usuario_token", response.data.token)

                        alert('Login efetuado com sucesso')
                        this.$router.push('/dashboard')
                    })
                    .catch((error) => {
                        console.log(error)
                        if (error.response?.data?.error) {
                            alert(error.response.data.error)
                        } else {
                            alert('Houve uma falha ao fazer login')
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

a,
p {
    color: #707b88;
    font-size: 14px;
}
</style>
