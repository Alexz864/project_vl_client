import styled from "styled-components";
import CartIcon from "./icons/CartIcon.js";
import Link from "next/link";
import FlyingButton from "./FlyingButton.js";
import HeartOutlineIcon from "./icons/HeartOutlineIcon.js";
import { useState } from "react";
import HeartSolidIcon from "./icons/HeartSolidIcon.js";
import axios from "axios";

const ProductWrapper = styled.div`
  button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 150px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 50px;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  margin-bottom: 25px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: left;
  }
`;

const WishlistButton = styled.button`
  border: 0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  cursor: pointer;
  ${(props) =>
    props.wished
      ? `
    color: red;
  `
      : `
    color: black;
  `}
  svg {
    width: 16px;
  }
`;

export default function ProductBox({
  _id,
  title,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const url = "/product/" + _id;
  const [isWished, setIsWished] = useState(wished);

  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;

    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }

    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then(() => {});

    setIsWished(nextValue);
  }

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <WishlistButton wished={isWished} onClick={addToWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishlistButton>

          <img src={images?.[0]} />
        </div>
      </WhiteBox>
      <TitleContainer>
        <Title href={url}>{title}</Title>
      </TitleContainer>
      <ProductInfoBox>
        <PriceRow>
          <Price>${price}</Price>
          <FlyingButton _id={_id} src={images?.[0]}>
            <CartIcon />
            Add to cart
          </FlyingButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
