import "./index.css"
import produtoService from "../../services/produto-service";
import Swal from "sweetalert2";
import Produto from "../../models/Produto";

import { useState, useEffect } from "react";

export default function Produtos() {

  const [produtos, setProdutos] = useState([])
  const [produto, setProduto] = useState(new Produto());
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    produtoService.obterProdutos()
      .then((response) => {
        setProdutos(response.data);
      })
      .catch(erro => { })
  }, []);

  const editarok = (e) => {
    setModoEdicao(true);
    let produtoParaEditar = produtos.find(p => p.id == e.target.id);
    produtoParaEditar.dataCadastro = produtoParaEditar.dataCadastro.substring(0,10);

    setProduto(produtoParaEditar);
  };

  const excluirProdutoNaLista = (produto) => {
    let indice = produtos.findIndex(p => p.id == produto.id);

    produtos.splice(indice, 1);

    setProdutos( arr => [...arr]);
  };

  const excluirok = (e) => {
    let produtoParaExcluir = produtos.find(p => p.id == e.target.id)

    // eslint-disable-next-line no-restricted-globals
    if(confirm("Deseja Realmente Exluir o Produto " + produtoParaExcluir.nome)) {
      
      produtoService.excluirProdutos(produtoParaExcluir.id)
        .then(() => {
          excluirProdutoNaLista(produtoParaExcluir);
        })
    }
  };

  const salvarok = () => {
    if(!produto.quantidadeEstoque || !produto.valor || !produto.nome || !produto.dataCadastro){
      Swal.fire({
        icon: 'error',
        text:  'Todos os campos são Obritatórios.'
      });

      return;

    }
    (modoEdicao) 
      ? atualizarProdutoNoBackend(produto) 
      : adicionarProdutoNoBackend(produto);
  }

  const atualizarProdutoNoBackend = (produto) => {
    produtoService.atualizarProdutos(produto)
    .then(response => {
      limparModal();

      Swal.fire({
        icon: 'success',
        title: `Produto ${produto.nome}, foi atualizado com sucesso!`,
        showCancelButton: false,
        timer: 4000,
      })

      let indice = produtos.findIndex(p => p.id == produto.id);
      produtos.splice(indice, 1, produto);

      setProdutos(lista => [...lista]);

    })
  }
  
  const adicionarok = () => {
    setModoEdicao(false);
    limparModal();
    
  }

  const limparModal = () => {
    setProduto({...produto,
      id: '',
      nome: '',
      valor: '',
      quantidadeEstoque: '',
      observacao: '',
      dataCadastro: '',
    });

  }
  const adicionarProdutoNoBackend = (produto) => {
    produtoService.adicionarProdutos(produto)
    .then(response => {

      setProdutos(lista => [...lista, new Produto(response.data)]);

      limparModal();

      Swal.fire({
        icon: 'success',
        title: `Produto ${produto.nome}, foi cadastrado com sucesso!`,
        showCancelButton: false,
        timer: 4000,
      })
    })
  }


  return (
    <div className="container">

      {/* TITULO */}
      <div className="row">
        <div className="col-sm-12">
          <h4>Lista de Produtos</h4>
          <hr />
        </div>
        {/* BOTÃO ADICIONAR */}
      </div>
      <div className="row">
        <div className="col-sm-3">
          <button onClick={adicionarok} id="btn-adicionar" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalproduto">Adicionar</button>
        </div>
      </div>

      {/* TABELA */}
      <div className="row mt-3">
        <div className="col-sm-12">

          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Valor</th>
                <th>Quantidade</th>
                <th>Obs.:</th>
                <th>Data Cadastro</th>
                

              </tr>
            </thead>
            <tbody>
              {produtos.map(produto => (
                <tr>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.valor}</td>
                  <td>{produto.quantidadeEstoque}</td>
                  <td>{produto.observacao}</td>
                  <td>{new Date(produto.dataCadastro).toLocaleDateString()}</td>
                  <td>
                    <button id={produto.id} onClick={editarok} className="btn btn-outline-info btn-sm mr-3" data-bs-toggle="modal" data-bs-target="#modalproduto">Editar</button>
                    <button id={produto.id} onClick={excluirok} className="btn btn-outline-secondary btn-sm mr-3">Excluir</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
      {/* The Modal */}
      <div className="modal" id="modalproduto">
        <div className="modal-dialog">
          <div className="modal-content">

            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">{modoEdicao ? 'Editar Produto' : 'Adicionar Produto'}</h4>
              <button type="button" className="btn-close"></button>

            </div>

            {/* Modal body */}
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-2">
                  <label for="id" className="form-label">Id</label>
                  <input id="id" type="text" disabled className="form-control" value={produto.id} onChange={(e) => setProduto({...produto, id: e.target.value})} />
                </div>

                <div className="col-sm-10">
                  <label for="produto" className="form-label">Produto</label>
                  <input id="produto" type="text" className="form-control" value={produto.nome} onChange={(e) => setProduto({...produto, nome: e.target.value})}/>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-2">
                  <label for="valor" className="form-label">Valor</label>
                  <input id="valor" type="text" className="form-control" value={produto.valor} onChange={(e) => setProduto({...produto, valor: e.target.value})}/>
                </div>

                <div className="col-sm-5">
                  <label for="quantidade" className="form-label">Quantidade no Estoque</label>
                  <input id="quantidade" type="text" className="form-control" maxlength="3" value={produto.quantidadeEstoque} onChange={(e) => setProduto({...produto, quantidadeEstoque: e.target.value})}/>
                </div>
                <div className="col-sm-5">
                  <label for="datacadastro" className="form-label">Data Cadastro</label>
                  <input id="datacadastro" type="date" className="form-control" value={produto.dataCadastro} onChange={(e) => setProduto({...produto, dataCadastro: e.target.value})}/>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <label for="observacao" className="form-label">Observação</label>
                  <input id="observacao" type="text" className="form-control" value={produto.observacao} onChange={(e) => setProduto({...produto, observacao: e.target.value})}/>
                </div>
              </div>

            </div>

            {/* Modal footer */}
            <div className="modal-footer">
              <button onClick={salvarok} id="btnsalvar" type="button" className="btn btn-success btn-sm">Salvar</button>
              <button id="btncancelar" type="button" className="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button>
            </div>

          </div>
        </div>
      </div>




    </div>
  )
}

