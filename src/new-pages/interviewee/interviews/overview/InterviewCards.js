import React from 'react';
import { Rate } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard } from '../Style';
import { updateWishList } from '../../../../redux/product/actionCreator';
import fullstack from '../../../../../src/assets/imges/c-full-stack.svg';
import { Cards } from '../../../../components/cards/frame/cards-frame';

const ProductCards = ({ product }) => {
  const { id, companyname, firstname, lastname, date,time,joiurl,status,level } = product;
  console.log(product)
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
          <span className="product-single-price__new">{companyname} </span>
        </p>
        <h4 className='interview-skill'>{level}</h4>
        <h4 className='justify-content-end  d-flex '>{date} {time}</h4>

      </figcaption>
    </ProductCard>
  );
};

ProductCards.propTypes = {
  product: PropTypes.object,
};

export default ProductCards;
