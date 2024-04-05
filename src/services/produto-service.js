import service from './service';

function adicionarProdutos(produto){
  return new Promise((resolve, reject) => {
    service.post('/produtos', produto)
      .then(response => resolve(response))
      .catch(erro => reject(erro));
  });
}

function obterProdutos(){
  return new Promise((resolve, reject) => {
    service.get('/produtos')
      .then(response => resolve(response))
      .catch(erro => reject(erro));
  });
}

function atualizarProdutos(produto){
  return new Promise((resolve, reject) => {
    service.put(`/produtos/${produto.id}`, produto)
      .then(response => resolve(response))
      .catch(erro => reject(erro));
  });
}

function excluirProdutos(id){
  return new Promise((resolve, reject) => {
    service.delete(`/produtos/${id}`)
      .then(response => resolve(response))
      .catch(erro => reject(erro));
  });
}

export default {
  adicionarProdutos,
  obterProdutos,
  atualizarProdutos,
  excluirProdutos,
};
