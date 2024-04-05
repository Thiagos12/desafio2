import React from 'react';

const products = [
  {
    id: 1,
    produto: 'Sapato',
    valor: 200,
    quantidade: 10,
    obs: 'Produto original',
    dataCadastro: '01/04/2024',
  },
  {
    id: 2,
    produto: 'Camisa do Barcelona',
    valor: 280,
    quantidade: 50,
    obs: 'Produto original',
    dataCadastro: '01/04/2024',
  },
  {
    id: 4,
    produto: 'Pulseira de Couro',
    valor: 200,
    quantidade: 35,
    obs: 'Produto 100% Algodão',
    dataCadastro: '23/04/2024',
  },
  {
    id: 5,
    produto: 'Pulseira ouro',
    valor: 6000,
    quantidade: 67,
    obs: 'Produto 100% original, qualidade garantida',
    dataCadastro: '10/04/2024',
  },
];

const ProductPage = () => {
  return (
    <div>
      <h1>Produtos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Obs.</th>
            <th>Data Cadastro</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.produto}</td>
              <td>{product.valor}</td>
              <td>{product.quantidade}</td>
              <td>{product.obs}</td>
              <td>{product.dataCadastro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;