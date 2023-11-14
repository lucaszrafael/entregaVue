<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    interface Entrega {
        id: number,
        descricao: string,
        dataHoraLimite: Date,
        observacoes: string
    }
    
    const entregas = ref([] as Entrega[])

    const descricao = ref()
    const dataHoraCadastro = ref()
    const dataHoraLimite = ref()
    const peso = ref()
    const observacoes = ref()

    const dataHoraLimitePesquisa = ref()

    async function buscarEntregas() {
        entregas.value = (await axios.get("entrega")).data
    }

    async function cadastrarEntrega() {
        await axios.post("entrega", 
        {
          descricao: descricao.value,
          dataHoraCadastro: dataHoraCadastro.value,
          dataHoraLimite: dataHoraLimite.value,
          peso: peso.value,
          observacoes: observacoes.value
        });
        descricao.value = ''
        dataHoraCadastro.value = ''
        dataHoraLimite.value = ''
        peso.value = ''
        observacoes.value = ''
        buscarEntregas()
    }

    async function pesquisarEntregas() {
        entregas.value = (await axios.get("entrega/" + dataHoraLimitePesquisa.value)).data
    }

    onMounted(() => {
        buscarEntregas()
    })
</script>

<template>
    <div class="entregas">
        <h1>Gerenciamento de Entregas</h1><br/>

        <input type="datetime-local" v-model="dataHoraLimitePesquisa" />
        <input type="submit" value="Pesquisar" @click="pesquisarEntregas()" />
        <table v-if="entregas.length > 0">
            <thead>
                <td>Id</td>
                <td>Descrição</td>
                <td>Data e Hora Limite</td>
                <td>Observações</td>
            </thead>
            <tbody>
                <tr v-for="entrega in entregas" :key="entrega.id">
                <td>{{ entrega.id }}</td>
                <td>{{ entrega.descricao }}</td>
                <td>{{ entrega.dataHoraLimite }}</td>
                <td v-if="entrega.observacoes">{{ entrega.observacoes }}</td>
                <td v-else>Sem observações</td>
                </tr>
            </tbody>
        </table>
        <p v-else>Nenhum registro foi encontrado para os critérios fornecidos</p>
        <br/>

        <h2>Cadastro de Entrega</h2>
        <label>Descrição:</label><br/>
        <input type="text" v-model="descricao" /><br/>
        <label>Data e Hora de Cadastro:</label><br/>
        <input type="datetime-local" v-model="dataHoraCadastro"/><br/>
        <label>Data e Hora Limite:</label><br/>
        <input type="datetime-local" v-model="dataHoraLimite"/><br/>
        <label>Peso:</label><br/>
        <input type="number" v-model="peso"><br/>
        <label>Observacoes:</label><br/>
        <input type="text" v-model="observacoes"><br/>
        <input type="submit" value="Cadastrar Entrega" @click="cadastrarEntrega()"/><br/><br/>
    </div>
</template>
