import React from 'react';

function ProductCard({ produto }) {

  const imagem = produto.url_imagem || 'https://via.placeholder.com/300x200?text=Sem+Imagem';

  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img src={imagem} alt={produto.nome} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{produto.nome}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{produto.descricao_detalhada}</p>
        <div className="flex justify-between items-center mt-3">
            {produto.preco_atual > 0 ? (
                <span className="text-green-700 font-bold">R$ {produto.preco_atual}</span>
            ) : (
                <span className="text-yellow-600 font-bold text-sm">Sob Orçamento</span>
            )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;