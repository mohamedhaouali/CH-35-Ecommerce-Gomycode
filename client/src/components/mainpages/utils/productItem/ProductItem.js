import React from 'react'
import BtnRender from './BtnRender'


function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {

    return (
        <div className="product_card">

            {
                isAdmin && <input type="checkbox" checked={product.checked}
                    onChange={() => handleCheck(product._id)}
                />
            }


            <img className="card-img-top" src={product.images.url} alt="" />

            <div className="product_box">
                <h2 className="card-title" title={product.title}>{product.title}</h2>
                <span className="card-subtitle">${product.price}</span>
                <p className="card-text">{product.description}</p>

            </div>


            {/* il se trouver dans BtnRender*/}

            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div >
    )
}

export default ProductItem
