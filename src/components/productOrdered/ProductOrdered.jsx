import "./productOrdered.css"

export default function ProductOrdered({ 
  index, 
  theBasket, 
  product,
  handleQuantityChange, 
  removeProductFromBasket,
  // seAplicaDescuento 
  }) {

    // console.log("product", product);
    // console.log("theBasket.productOrdered[index]?.quantity", theBasket.productOrdered[index]?.quantity)

  const uniqueKey = `product-ordered-${product.product}`;

  return (
      <div className="productOrdered" key={uniqueKey}>
        <input
          required
          autoFocus
          type="number" 
          pattern="/[^0-9]|(?<=\..*)\./g" 
          step="1" 
          min="1"
          max="999999"
          name={uniqueKey}
          id={uniqueKey}
          data-index={index}
          data-property="quantity"
          className="inputItemOrdered"
          onChange={handleQuantityChange}
          value={theBasket.productOrdered[index]?.quantity}
          autoComplete="off"
        />

        <img src={`/img/products/${product.imageCover}`} className="productOrdered--image" alt={product.productName} />

        <div className="productOrdered__info">
          <p className="itemOrdered">SKU: {product.sku}</p>
          <p className="itemOrdered__productName">{product.productName}</p>

          {/* Precio Unitario */}
          <div className="itemContainer">
            <span className="itemOrdered">Precio Unitario: </span>
            <span className="itemOrdered__currency">${product.priceDeVenta}</span>
          </div>

          {/* sub Total = Precio Unitario X Cantidad */}
          <div className="itemContainer">
            <span className="itemOrdered">Sub total:</span> {
              theBasket.productOrdered[index]?.quantity === undefined || 
              theBasket.productOrdered[index]?.quantity === "" || 
              theBasket.productOrdered[index]?.quantity === null 
              ? "" 
              : <span className="itemOrdered__currency"> {`$${theBasket.productOrdered[index]?.quantity  * product.priceDeVenta}`} </span>}           
          </div>

          {/* Descuento */}
          <div className="itemContainer">
            <span className="itemOrdered">Descuento (-):</span>  
              {/* {seAplicaDescuento  */}
              {theBasket.seAplicaDescuento 
                    ? <span className="itemOrdered__currency"> {`- $${theBasket.productOrdered[index]?.descuento}`}</span>
                    : ""
              }
          </div>

          {/* Total = sub Total - Descuento */}
          <div className="itemContainer">
            <span className="itemOrdered productTotal">Total:</span> {
              (theBasket.productOrdered[index]?.quantity !== undefined && 
                theBasket.productOrdered[index]?.quantity !== "" && 
                // theBasket.productOrdered[index]?.quantity !== null ) && seAplicaDescuento
                theBasket.productOrdered[index]?.quantity !== null ) && theBasket.seAplicaDescuento
                ? <span className="itemOrdered__currency productTotal">{`$${theBasket.productOrdered[index]?.quantity  * product.priceDeVenta - theBasket.productOrdered[index]?.descuento}`}</span>
                : <span className="itemOrdered__currency productTotal">{`$${theBasket.productOrdered[index]?.quantity  * product.priceDeVenta}`}</span>
              }                     
          </div>
        </div>

        <button className="botonRemoveProductFromBasket" onClick={()=>removeProductFromBasket(index)}>Borrar</button>     
      </div>  
  )
} 
