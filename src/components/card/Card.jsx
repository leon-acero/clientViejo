import "./card.css"

export default function Card({ uniqueKey, product, esMayorista, addProductToBasket }) {
  
  return (
    <div key={uniqueKey} className="card">
      <img src={`/img/products/${product.imageCover}`} className="card--image" alt={product.productName} />
      <div className="card--stats">
        <div className="card--stats__info">
          <p>SKU: {product.sku}</p>
          <p>{product.productName}</p>
          <p>${esMayorista 
                ? product.priceMayoreo 
                : product.priceMenudeo}
          </p>
        </div>

        <button className="buttonAddProductToBasket" onClick={()=>addProductToBasket(product.id)}>Agregar al Carrito</button>
      </div>
    </div>  

)
}
