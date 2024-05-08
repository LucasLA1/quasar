<template>
  <div class="centered-box">
    <div class="content-box">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <h5 class="agendar">Agende Aqui</h5>
        <q-input
          filled
          v-model="name"
          label="Seu nome *"
          hint="Nome e sobrenome"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite algo']"
        />

        <q-select
          outlined
          v-model="specialty"
          :options="specialtyOptions"
          label="Especialidade desejada *"
          hint="Sua Especialidade desejada"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor escolha sua especialidade']"
        />

        <q-select
          outlined
          v-model="service"
          :options="serviceOptions"
          label="Serviço solicitado *"
          hint="O serviço que você deseja agendar"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor escolha o serviço']"
        />

        <q-input
          filled
          type="date"
          v-model="date"
          label="Data do agendamento *"
          hint="Data que você deseja agendar o serviço"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor escolha uma data']"
        />
        <div>

          <h7 style="margin: -5px 0;">Selecione o horario:</h7>
        </div>

        <div class="time-table">
          <div class="q-pa-md">
            <div class="q-gutter-y-md">
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
              />
            </div>
          </div>
          <div class="q-pa-md">
            <div class="q-gutter-y-md">
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
              />
            </div>
          </div>
        </div>

        <div class="button-group">
          <q-btn label="Agendar" type="submit" color="secondary" @click="agendar" />
          <q-btn label="Limpar" type="reset" color="secondary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const name = ref(null)
    const age = ref(null)
    const specialty = ref(null)
    const service = ref(null)
    const date = ref(null)
    const accept = ref(false)

    const specialtyOptions = [
      'Advogado',
      'Nutricionista',
      'Médico',
      'Ortopedia',
      'Pediatria',
      'Psiquiatria',
      'Outra'
    ]

    const serviceOptions = [
      'Consulta Nutri- 200 Reais',
      'Consulta Médico - 250 Reais',
      'Contrato Advogado - 230 Reais',
      'Produto X Nutri - 100 Reais',
      'Compra e venda Advogado - 150 reais',
      'Outro'
    ]

    const timeRows = [
      { label: '8:00', value: '8:00' },
      { label: '9:00', value: '9:00' },
      { label: '10:00', value: '10:00' },
      { label: '11:00', value: '11:00' },
      { label: '12:00', value: '12:00' },
      { label: '13:00', value: '13:00' },
      { label: '14:00', value: '14:00' },
      { label: '15:00', value: '15:00' }
    ]
    const firstRow = timeRows.slice(0, 4)
    const secondRow = timeRows.slice(4)
    const selectedTimes = ref([])

    const router = useRouter()

    const agendar = () => {
      router.push('/Consultas')
    }

    const onReset = () => {
      name.value = null
      age.value = null
      specialty.value = null
      service.value = null
      date.value = null
      accept.value = false
    }

    const toggleTime = (row) => {
      row.selected = !row.selected
    }

    return {
      name,
      age,
      specialty,
      service,
      date,
      accept,
      specialtyOptions,
      serviceOptions,
      timeRows,
      selectedTimes,
      firstRow,
      secondRow,
      agendar,
      onReset,
      toggleTime
    }
  }
}
</script>

<style scoped>
.centered-box {
  display: Block;
  justify-content: center;
  align-items: center;
  background: #ebebeb;
  border-radius: 25px;
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content-box {
  display: block;
  width: 700px;
  height: auto;
  background-color: #ebebeb;
  border-radius: 15px;
  padding: 20px;
  width: 100%;
}

.button-group {
  margin-top: 20px;
}

.time-table {
  margin-top: 20px;
  display: flex;
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
.agendar{
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3fa6b8 ;
  font-weight: bold;
  font-size: 30px;
  width: 100%;
}
</style>
