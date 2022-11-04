import Card from '../card/Card';
import "./productInput.css"

export default function ProductInput({ 
  index, 
  product, 
  addProductToBasket,
  esMayorista}) {

  const uniqueKey = `product-${product.id}`;

  return (
    <Card uniqueKey={uniqueKey} product={product} esMayorista={esMayorista} addProductToBasket={addProductToBasket} />
    // <div className="productInput" key={uniqueKey}>
    //     <p className="nombreProducto">{product.sku} - {product.productName}</p>

    //     <button onClick={()=>addProductToBasket(product.id)}>Agregar</button>     
    // </div>
  )
}
