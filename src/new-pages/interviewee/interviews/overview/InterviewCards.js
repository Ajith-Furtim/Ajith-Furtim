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
import moment from 'moment';

const ProductCards = ({ interview }) => {
  const { id, companyname, firstname, lastname, date,time,joiurl,status,level } = interview;
  console.log(interview)
  const dispatch = useDispatch();

  return (
    <ProductCard style={{ marginBottom: 30 }}>
        <Link to={{ pathname: "/interviewee/scheduledinterview", state: { data: interview } }}>
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
        <h4 className='justify-content-end  d-flex '>{moment(date).format('DD MMM')} {time}</h4>

      </figcaption>
      </Link>
    </ProductCard>
  );
};

ProductCards.propTypes = {
  product: PropTypes.object,
};

export default ProductCards;
