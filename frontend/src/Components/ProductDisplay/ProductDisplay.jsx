import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='product-display'>
      <div className="product-display-left">
        <div className="product-display-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="product-display-img">
            <img className='product-display-img-main' src={product.image} alt="" />
        </div>
      </div>
      <div className="product-display-right">
        <h1>{product.name}</h1>
        <div className="product-display-rating">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
        </div>
        <div className='product-display-prices'>
            <div className="product-display-oldprice">₹{product.old_price}</div>
            <div className="product-display-newprice">₹{product.new_price}</div>
        </div>
        <div className="product-display-description">
            Add product description. I will probably create a product description attribute.
        </div>

        {
          product.category==="Phones" || product.category==="Tablets"
            ? <div className="product-display-size">
              <h1>Select Configuration</h1>
              <div className="product-display-sizes">
                {product.category==="Tablets"?<div>64GB</div>:<></>}
                <div>128GB</div>
                <div>256GB</div>
                <div>512GB</div>
                <div>1TB</div>
              </div>
            </div>
            : <div className="product-display-size">
              <div className="product-display-sizes">
              </div>
            </div>
        }
        <button onClick={() => {addToCart(product.id)}}>ADD TO CART</button>
        <p className='product-display-category'><span>Category: </span> {product.category}</p>
        <p className='product-display-category'><span>Tags: </span>Latest, High Quality, Offer, Premium</p>
      </div>
    </div>
  )
}

export default ProductDisplay
