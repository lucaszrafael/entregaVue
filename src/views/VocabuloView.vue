<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    interface Vocabulo {
        id: number,
        termo: string,
        dataHoraLimite: Date,
        significado: string,
        versao: string
    }
    
    const vocabulo = ref([] as Vocabulo[])

    const termo = ref()
    const dataHoraCadastro = ref()
    const dataHoraLimite = ref()
    const significado = ref()
    const versao = ref()

    const dataHoraLimitePesquisa = ref()
    const termoSearch = ref()
    const versaoSearch = ref()

    async function buscarVocabulo() {
        vocabulo.value = (await axios.get("vocabulo")).data
    }

    async function cadastrarVocabulo() {
        await axios.post("vocabulo", 
        {
          termo: termo.value,
          dataHoraCadastro: dataHoraCadastro.value,
          dataHoraLimite: dataHoraLimite.value,
          versao: versao.value,
          significado: significado.value
        });
        termo.value = ''
        dataHoraCadastro.value = ''
        dataHoraLimite.value = ''
        versao.value = ''
        significado.value = ''
        buscarVocabulo()
    }

    async function pesquisarVocabulo() {
        vocabulo.value = (await axios.get("vocabulo/" +  termoSearch.value + '/' + versaoSearch.value)).data
    }

    onMounted(() => {
        buscarVocabulo()
    })
</script>

<template>
    <div class="entregas">
        <h1>Gerenciamento de Vocabulos</h1><br/>

        <input type="datetime-local" v-model="dataHoraLimitePesquisa" />
        <input type="submit" value="Pesquisar" @click="pesquisarVocabulo()" />
        <input type="text" v-model="termoSearch" />
        <input type="number" v-model="versaoSearch" />

        <table v-if="vocabulo.length > 0">
            <thead>
                <td>Id</td>
                <td>Termo</td>
                <td>Versao</td>
                <td>Data e Hora Limite</td>
                <td>Significado</td>
            </thead>
            <tbody>
                <tr v-for="vocabul in vocabulo" :key="vocabul.id">
                <td>{{ vocabul.id }}</td>
                <td>{{ vocabul.termo }}</td>
                <td>{{ vocabul.versao }}</td>
                <td>{{ vocabul.dataHoraLimite }}</td>
                <td> {{ vocabul.significado }}</td>
                </tr>
            </tbody>
        </table>
        <p v-else>Nenhum registro foi encontrado para os critérios fornecidos</p>
        <br/>

        <h2>Cadastro de Vocabulo</h2>
        <label>Termo:</label><br/>
        <input type="text" v-model="termo" /><br/>
        <label>Data e Hora de Cadastro:</label><br/>
        <input type="datetime-local" v-model="dataHoraCadastro"/><br/>
        <label>Data e Hora Limite:</label><br/>
        <input type="datetime-local" v-model="dataHoraLimite"/><br/>
        <label>Versao:</label><br/>
        <input type="number" v-model="versao"><br/>
        <label>Significado:</label><br/>
        <input type="text" v-model="significado"><br/>
        <input type="submit" value="Cadastrar Vocabulo" @click="cadastrarVocabulo()"/><br/><br/>
    </div>
</template>
