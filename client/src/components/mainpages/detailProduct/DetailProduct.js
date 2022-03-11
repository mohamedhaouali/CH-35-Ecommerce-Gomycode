import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../../mainpages/utils/productItem/ProductItem'

function DetailProduct() {
    // use Params teb3a lil route-dom
    const params = useParams()

    //use context
    const state = useContext(GlobalState)

    //appel au productAPI
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    //cycle du vie

    useEffect(() => {
        console.log('re render')
        if (params.id) {
            //boucle pour detail product
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])

    //console.log(detailProduct)

    if (detailProduct.length === 0) return null;

    return (
        <>
            <div class="container d-flex justify-content-center">
                <figure class="card card-product-grid card-lg"> <a href="#" class="img-wrap" data-abc="true"> <img src={detailProduct.images.url} alt="" /> </a>
                    <figcaption class="info-wrap">
                        <div class="row">
                            <div class="col-md-9 col-xs-9"> {detailProduct.title} <span class="rated">
                            </span> </div>
                            <p>{detailProduct.description}</p>
                            <div class="col-md-3 col-xs-3">
                                <div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <span class="rated">{detailProduct.content}</span> </div>
                            </div>
                        </div>
                    </figcaption>
                    <div class="bottom-wrap-payment">
                        <figcaption class="info-wrap">
                            <div class="row">
                                <div class="col-md-9 col-xs-9"> Price : $ {detailProduct.price}  </div>
                                <div class="col-md-3 col-xs-3">
                                    <div class="rating text-right"> Sold: {detailProduct.sold} </div>
                                </div>
                            </div>
                        </figcaption>
                    </div>
                    <div class="bottom-wrap"> <Link to="/cart" class="btn btn-primary float-right" data-abc="true" onClick={() => addCart(detailProduct)}> Add to Cart   </Link>

                    </div>
                </figure>
            </div>

            <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>

            </div>

        </>
    )
}

export default DetailProduct
