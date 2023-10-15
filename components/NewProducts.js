import styled from "styled-components";
import Center from "./Center.js";
import ProductsGrid from "./ProductsGrid.js";

const Title = styled.h2`
  margin: 30px 0 20px;
  font-size: 2rem;
  font-weight: 500;
`;

export default function NewProducts({ products, wishedProducts }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </Center>
  );
}
