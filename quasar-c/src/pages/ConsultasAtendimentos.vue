<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      ref="tableRef"
      title="Agendamentos"
      :rows="rows"
      :columns="columns"
      :table-colspan="9"
      row-key="index"
      title-class="custom-title-color"
      v-show="!isLoading"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="contatos" :props="props">
            {{ props.row.contato }}
          </q-td>
          <q-td key="Data" :props="props">
            {{ props.row.date }}
          </q-td>
          <q-td key="Hora" :props="props">
            {{ props.row.selectedTimes }}
          </q-td>
          <q-td key="Especialidade" :props="props">
            {{ props.row.specialty }}
          </q-td>
          <q-td key="Serviço" :props="props">
            {{ props.row.service }}
          </q-td>
          <q-td class="text-right">
            <q-btn color="red" label="Desmarcar" @click="handleButtonClick(props.row)" />
          </q-td>
        </q-tr>
        <q-loading :showing="isLoading" />
      </template>
    </q-table>

    <q-loading :showing="isLoading" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup () {
    const columns = [
      { name: 'name', required: true, label: 'Nome', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
      { name: 'contatos', align: 'center', label: 'Contato', field: 'contato', sortable: true },
      { name: 'Data', label: 'Data', field: 'date', sortable: true },
      { name: 'Hora', label: 'Hora', field: 'selectedTimes', sortable: true },
      { name: 'Especialidade', label: 'Especialidade', field: 'specialty' },
      { name: 'Serviço', label: 'Serviço', field: 'service' }
    ]

    const rows = ref([])
    const isLoading = ref(false)

    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://660c98833a0766e85dbe5c0a.mockapi.io/user')
        return response.data
      } catch (error) {
        console.error('Erro ao buscar os contatos:', error)
        return []
      }
    }

    const fetchAppointments = async () => {
      isLoading.value = true
      try {
        const appointmentsResponse = await axios.get('https://66551cb63c1d3b6029384591.mockapi.io/teste')
        const contacts = await fetchContacts()

        const appointments = appointmentsResponse.data

        const mergedData = appointments.map(appointment => {
          const contact = contacts.find(contact => contact.id === appointment.id)
          return {
            ...appointment,
            contato: contact ? contact.contato : 'N/A'
          }
        })

        rows.value = mergedData
      } catch (error) {
        console.error('Erro ao buscar os dados:', error)
      } finally {
        isLoading.value = false
      }
    }

    const handleButtonClick = async (row) => {
      isLoading.value = true
      try {
        await axios.delete(`https://66551cb63c1d3b6029384591.mockapi.io/teste/${row.id}`)
        rows.value = rows.value.filter(r => r !== row)
      } catch (error) {
        console.error('Erro ao excluir o dado:', error)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(() => {
      fetchAppointments()
    })

    return {
      columns,
      rows,
      handleButtonClick,
      isLoading
    }
  }
}

</script>

<style>
.text-right {
  text-align: right;
}

button {
  display: block;
  width: 100%;
  height: 36px;
  border-radius: 30px;
  background-color: #26a69a;
  color: white;
  font-size: 15px;
  cursor: pointer;
}
.custom-title-color{
  display: flex;
  justify-content: center;
  color: #3fa6b8;
  font-weight: bold;
  font-size: 30px;
  width: 100%;
}
</style>
