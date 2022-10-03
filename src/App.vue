

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
        <input type="number" step="0.01" placeholder="Valor" v-model="produto.valor">

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
              <button @click="edit(produto)" class="waves-effect btn-small blue darken-1 edit-button"><i
                  class="material-icons">create</i></button>
              <button @click="remove(produto)" class="waves-effect btn-small red darken-1"><i
                  class="material-icons">delete_sweep</i></button>
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
        id: '',
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
      if (!this.produto.id) {
        Produto.saveProduct(this.produto).then(response => {
          this.produto = {};//Limpa os campos
          this.toast.success("Produto salvo com sucesso");
          this.listProducts();
        }).catch(e => {
          if (e.code === "ERR_NETWORK") {
            this.toast.error("Ops Erro de conexão com o banco de dados, talvez o heroku free tenha acabado :(");
            return;
          }
          this.toast.error("Ops Campos vazios, preencha todos os dados por favor");
        });

      } else {
        Produto.editProduct(this.produto).then(response => {
          this.produto = {};//Limpa os campos
          this.toast.success("Produto Atualizado com sucesso");
          this.listProducts();
        }).catch(e => {
          if (e.code === "ERR_NETWORK") {
            this.toast.error("Ops Erro de conexão com o banco de dados, talvez o heroku free tenha acabado :(");
            return;
          }
          this.toast.error("Ops Campos vazios, preencha todos os dados por favor, para atualizar um produto");
        });
      }

    },

    edit(produto) {
      this.produto = produto;
    },

    remove(produto) {
      if (confirm('Você deseja realmente deletar esse produto?')) {
        Produto.deleteProduct(produto.id).then(response => {
          this.toast.success("Produto Deletado com sucesso");
          this.listProducts();
        }).catch(e => {
          this.toast.error("Ops Erro de conexão com o banco de dados, talvez o heroku free tenha acabado :(");
        });
      }
    }



  }


}
</script>

<style >
.edit-button {
  margin: 5px;

}
</style>
