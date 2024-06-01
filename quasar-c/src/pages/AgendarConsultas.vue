<template>
  <div class="centered-box">
    <div class="content-box">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" style="padding: 20px;">
        <h5 class="agendar">Agende Aqui</h5>
        <q-input
          filled
          v-model="name"
          label="Seu nome *"
          hint="Nome e sobrenome"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite algo']"
          style="margin-bottom: 20px;"
        />

        <q-select
          outlined
          v-model="specialty"
          :options="specialtyOptions"
          label="Especialidade desejada *"
          hint="Sua Especialidade desejada"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor escolha sua especialidade']"
          style="margin-bottom: 20px;"
        />

        <q-select
          outlined
          v-model="service"
          :options="serviceOptions"
          label="Serviço solicitado *"
          hint="O serviço que você deseja agendar"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor escolha o serviço']"
          style="margin-bottom: 20px;"
        />

        <q-input
          filled
          type="date"
          v-model="date"
          label="Data do agendamento *"
          hint="Data que você deseja agendar o serviço"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor escolha uma data']"
          style="margin-bottom: 20px;"
        />

        <div class="Horaios">
          <h6 style="margin: -5px 0">Selecione o horário:</h6>
        </div>

        <div class="time-table">
          <div class="q-pa-md">
            <q-btn-toggle
              v-model="selectedTimes"
              spread
              class="my-custom-toggle"
              no-caps
              rounded
              unelevated
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="firstRow"
              style="margin-bottom: 20px;"
            />
            <q-btn-toggle
              v-model="selectedTimes"
              spread
              class="my-custom-toggle"
              no-caps
              rounded
              unelevated
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="secondRow"
              style="margin-bottom: 20px;"
            />
            <q-btn-toggle
              v-model="selectedTimes"
              spread
              class="my-custom-toggle"
              no-caps
              rounded
              unelevated
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="thirdRow"
              style="margin-bottom: 20px;"
            />
            <q-btn-toggle
              v-model="selectedTimes"
              spread
              class="my-custom-toggle"
              no-caps
              rounded
              unelevated
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="fourthRow"
              style="margin-bottom: 20px;"
            />
          </div>
        </div>

        <div class="button-group">
          <q-btn label="Agendar" type="submit" color="secondary" :disable="!formIsValid" />
          <q-btn label="Limpar" type="reset" color="secondary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup () {
    const name = ref(null)
    const specialty = ref(null)
    const service = ref(null)
    const date = ref(null)
    const selectedTimes = ref([])

    const specialtyOptions = [
      'Advogado',
      'Nutricionista',
      'Médico',
      'Outra'
    ]

    const serviceOptions = ref([])

    const timeRows = [
      { label: '7:00', value: '7:00' },
      { label: '8:00', value: '8:00' },
      { label: '9:00', value: '9:00' },
      { label: '10:00', value: '10:00' },
      { label: '11:00', value: '11:00' },
      { label: '12:00', value: '12:00' },
      { label: '13:00', value: '13:00' },
      { label: '14:00', value: '14:00' },
      { label: '15:00', value: '15:00' },
      { label: '16:00', value: '16:00' },
      { label: '17:00', value: '17:00' },
      { label: '18:00', value: '18:00' }

    ]

    const firstRow = timeRows.slice(0, 3)
    const secondRow = timeRows.slice(3, 6)
    const thirdRow = timeRows.slice(6, 9)
    const fourthRow = timeRows.slice(9, 12)

    const router = useRouter()

    const agendar = () => {
      router.push('/Consultas')
    }

    const onReset = () => {
      name.value = null
      specialty.value = null
      service.value = null
      date.value = null
      selectedTimes.value = []
    }

    const formIsValid = computed(() => {
      return name.value && specialty.value && service.value && date.value && selectedTimes.value.length > 0
    })

    const onSubmit = () => {
      const data = {
        name: name.value,
        specialty: specialty.value,
        service: service.value,
        date: date.value,
        selectedTimes: selectedTimes.value
      }

      axios.post('https://66551cb63c1d3b6029384591.mockapi.io/teste', data)
        .then(response => {
          console.log('Dados enviados com sucesso:', response.data)
          alert('Agendamento realizado com sucesso!')
          agendar()
        })
        .catch(error => {
          console.error('Erro ao enviar os dados:', error)
          alert('Ocorreu um erro ao realizar o agendamento. Por favor, tente novamente.')
        })
    }
    const fetchServiceOptions = () => {
      axios.get('https://660c98833a0766e85dbe5c0a.mockapi.io/produto')
        .then(response => {
          serviceOptions.value = response.data.map(item => item.produto)
        })
        .catch(error => {
          console.error('Erro ao buscar os dados da API:', error)
        })
    }
    onMounted(() => {
      fetchServiceOptions()
    })

    return {
      name,
      specialty,
      service,
      date,
      specialtyOptions,
      serviceOptions,
      selectedTimes,
      firstRow,
      secondRow,
      thirdRow,
      fourthRow,
      agendar,
      onReset,
      formIsValid,
      onSubmit
    }
  }
}
</script>

<style scoped>
.centered-box {
  display: block;
  justify-content: center;
  align-items: center;
  background: #ebebeb;
  border-radius: 25px;
  width: 90%;
  max-width: 700px;
  margin: 30px auto;
  padding: 20px;
}

.content-box {
  background-color: #ebebeb;
  border-radius: 15px;
  padding: 20px;
}

.button-group {
  margin-top: 20px;
  display: flex;
}

.time-table {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.time-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.selected {
  background-color: #2196F3 !important;
  width: 100%;
}

.my-custom-toggle {
  border: 1px solid #027be3;
  width: 100%;
}

.agendar {
  display: flex;
  justify-content: center;

  color: #3fa6b8;
  font-weight: bold;
  font-size: 30px;
  width: 100%;
}
.Horaios {
  display: flex;
  justify-content: center;
  color: #3fa6b8;
  font-weight: bold;
  font-size: 30px;
  width: 100%;
}

@media only screen and (max-width: 767px) {
  .time-table {
    flex-direction: column;
  }
}
</style>
