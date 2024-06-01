<template>
  <div class="primeira">
    <form class="form" @submit.prevent="enviarFormulario">
      <h2 style="font-weight: bold;">Registrar</h2>
      <label>
        <span>Nome Completo</span>
        <q-input
          rounded
          outlined
          v-model="nomeCompleto"
          label="Digite seu Nome"
          :rules="[val => !!val || 'Digite seu Nome']"
        />
      </label>
      <label>
        <span>Contato</span>
        <q-input
      rounded
      outlined
      v-model="contato"
      label="Digite seu Contato"
      :rules="[val => !!val || 'Digite seu Contato', val => /^[0-9]+$/.test(val) || 'Somente números são permitidos']"
    />
      </label>
      <label>
        <span>Email</span>
        <q-input
          rounded
          outlined
          v-model="email"
          label="Digite seu Email"
          :rules="[
                    val => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(val) || 'Insira um endereço de email válido',
                    val => val && val.length >= 5 || 'O email deve ter no mínimo 5 caracteres'
                  ]"
        />
      </label>
      <label>
        <span>Senha</span>
        <div>
          <q-input rounded outlined v-model="senha" :type="showPassword  ? 'password' : 'text'" placeholder="Digite sua senha">
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
            </template>
          </q-input>
        </div>
      </label>
      <label>
        <span>Confirme sua senha</span>
        <div>
          <q-input
            rounded
            outlined
            v-model="confirmarSenha"
            :type="showConfirmPassword ? 'password' : 'text'"
            placeholder="Digite sua senha"
            :rules="[val => val === senha || 'As senhas não coincidem']"
          >
      <template v-slot:append>
        <q-icon
          :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="showConfirmPassword = !showConfirmPassword"
          />
      </template>
          </q-input>
        </div>
      </label>
      <label>
        <span>Data de Nascimento</span>
        <div class="date-input-container">
          <q-input filled v-model="dataNascimento" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dataNascimento">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Enviar" color="secondary" flat text-color="white" />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </label>
      <label class="salvar-senha-label">
        <q-toggle v-model="concordoTermos" color="secondary" label="Concordo com os termos" />
      </label>
      <q-btn flat color="secondary" label="Criar" type="submit" text-color="white" :disabled="!todosCamposPreenchidos" />
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup () {
    const nomeCompleto = ref('')
    const contato = ref('')
    const email = ref('')
    const senha = ref('')
    const confirmarSenha = ref('')
    const dataNascimento = ref('')
    const concordoTermos = ref(false)
    const showPassword = ref('password')
    const showConfirmPassword = ref('password')
    const router = useRouter()

    const todosCamposPreenchidos = computed(() => {
      return (
        nomeCompleto.value &&
        contato.value &&
        email.value &&
        senha.value &&
        confirmarSenha.value &&
        dataNascimento.value &&
        concordoTermos.value
      )
    })

    const enviarFormulario = async () => {
      if (senha.value !== confirmarSenha.value) {
        alert('As senhas não coincidem')
        return
      }

      if (!concordoTermos.value) {
        alert('Você deve concordar com os termos')
        return
      }

      try {
        await axios.post('https://660c98833a0766e85dbe5c0a.mockapi.io/user', {
          nomeCompleto: nomeCompleto.value,
          contato: contato.value,
          email: email.value,
          confirmarSenha: confirmarSenha.value,
          dataNascimento: dataNascimento.value
        })

        alert('Cadastro realizado com sucesso!')
        router.push({ name: 'AgendarConsultas' })
      } catch (error) {
        console.error('Erro ao registrar cliente:', error)
        alert('Ocorreu um erro ao registrar. Tente novamente.')
      }
    }

    return {
      nomeCompleto,
      contato,
      email,
      senha,
      confirmarSenha,
      dataNascimento,
      concordoTermos,
      enviarFormulario,
      showPassword,
      showConfirmPassword,
      todosCamposPreenchidos
    }
  }
}
</script>
<style scoped>

  .primeira {
    display: block;
    justify-content: center;
    align-items: center;
    background: #ebebeb;
    border-radius: 25px;
    width: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 48%;
    margin-top: 50px;
    padding: 20px;
  }

  h2 {
    color: #17a2b8;
    padding-top: 10px;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
  }

  .date-input-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .form {
    padding: 20px 30px;
    -webkit-transition:-webkit-transform 1.2s ease-in-out;
    transition: -webkit-transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
  }

  label {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }

  label span {
    font-size: 14px;
    font-weight: 600;
    color: #17a2b8;
    text-transform: uppercase;
  }

  input {
    display: flex;
    width: 100%;
    margin-top: 5px;
    font-size: 16px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(185, 77, 77, 0.4);
    text-align: center;
    font-family: 'Nunito', sans-serif;
  }

  button {
    display: block;
    margin: 20px auto;
    width: 100%;
    height: 36px;
    border-radius: 30px;
    background-color: #26a69a;
    color: white;
    font-size: 15px;
    cursor: pointer;
  }

  button:hover {
    background-color: rgb(43, 233, 91);
  }

  .salvar-senha-label {
    color: rgb(64, 166, 184);
  }

  @media only screen and (max-width: 767px) {
    .primeira {
      width: 90%;
      padding-top: 80px;
    }
  }
</style>
