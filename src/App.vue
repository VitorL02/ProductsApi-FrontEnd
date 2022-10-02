

<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos</a>
      </div>
    </nav>

    <div class="container">

      <form @submit.prevent="save">

        <label>Nome</label>
        <input type="text" placeholder="Nome" v-model="produto.nome">
        <label>Quantidade</label>
        <input type="number" placeholder="QTD" v-model="produto.quantidade">
        <label>Valor</label>
        <input type="text" placeholder="Valor" v-model="produto.valor">

        <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>QTD</th>
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="produto of products" :key="produto.id">

            <td>{{produto.nome}}</td>
            <td>{{produto.quantidade}}</td>
            <td>{{produto.valor}}</td>
            <td>
              <button class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>


<script >
import Produto from './service/products';
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();


    return { toast }
  },

  data() {
    return {
      produto: {
        nome: '',
        quantidade: '',
        valor: '',
      },
      products: [],
    }
  },
  mounted() {
    this.listProducts();

  },
  methods: {
    listProducts() {
      Produto.listProduct().then(response => {
        this.products = response.data;
      });
    },
    save() {
      Produto.saveProduct(this.produto).then(response => {
        this.produto = {};//Limpa os campos
        this.toast.success("Produto salvo com sucesso");
        this.listProducts();
      })
    }

  }


}
</script>

<style >

</style>
