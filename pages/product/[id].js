import Center from "@/components/Center.js";
import Header from "@/components/Header.js";
import Footer from "@/components/Footer.js";
import Title from "@/components/Title.js";
import { mongooseConnect } from "@/lib/mongoose.js";
import { Product } from "@/models/Product.js";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox.js";
import CartIcon from "@/components/icons/CartIcon.js";
import ProductImages from "@/components/ProductImages.js";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext.js";
import FlyingButton from "@/components/FlyingButton.js";
import ProductReviews from "@/components/ProductReviews";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

const SubTitle = styled.h2`
  font-size: 1em;
`;

export default function ProductPage({ product }) {
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <SubTitle>by {product.author}</SubTitle>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <FlyingButton main _id={product._id} src={product.images?.[0]}>
                  <CartIcon />
                  Add to cart
                </FlyingButton>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
        <ProductReviews product={product} />
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
