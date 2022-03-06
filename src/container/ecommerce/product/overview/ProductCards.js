import React from 'react';
import { Rate } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard } from '../../Style';
import { updateWishList } from '../../../../redux/product/actionCreator';
import fullstack from '../../../../../src/assets/imges/c-full-stack.svg';

const ProductCards = ({ product }) => {
  const { id, name, rate, price, oldPrice, popular, img } = product;
  const dispatch = useDispatch();

  return (
    <ProductCard style={{ marginBottom: 30 }}>
      <figure>
        <img src={fullstack} alt={`img${id}`} />
      </figure>
      <figcaption>
        {/* <Link onClick={() => dispatch(updateWishList(id))} className="btn-heart" to="#">
          <FeatherIcon
            icon="heart"
            size={14}
            color={popular ? '#FF4D4F' : '#9299B8'}
            fill={popular ? '#FF4D4F' : 'none'}
          />
        </Link> */}
        {/* <Heading className="product-single-title" as="h5">
          <Link to={`/admin/ecommerce/productDetails/${id}`}>INFO</Link>
        </Heading> */}
        <p className="product-single-price">
          <span className="product-single-price__new">INFO </span>
        </p>
        <div className='d-flex '>
        <h4>Skill</h4>
        <h4>26 Feb 04:00</h4>
        </div>

      </figcaption>
    </ProductCard>
  );
};

ProductCards.propTypes = {
  product: PropTypes.object,
};

export default ProductCards;
