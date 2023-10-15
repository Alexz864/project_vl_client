import Center from "@/components/Center.js";
import Header from "@/components/Header.js";
import Footer from "@/components/Footer.js";
import ProductsGrid from "@/components/ProductsGrid.js";
import { Category } from "@/models/Category.js";
import { Product } from "@/models/Product.js";
import { useState } from "react";
import styled from "styled-components";

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1.5em;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 10px;
  color: #444;
  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: #444;
  }
`;

export default function GenrePage({ category, products: originalProducts }) {
  const [products, setProducts] = useState(originalProducts);
  const [productsToDisplay, setProductsToDisplay] = useState(originalProducts);
  const authorsToDisplay = Array.from(new Set(products.map((p) => p.author)));

  const filterByAuthors = (ev) => {
    const author = ev.target.value;
    if (author === "all") {
      setProductsToDisplay(products);
    } else {
      const filteredProducts = products.filter((p) => p.author === author);
      setProductsToDisplay(filteredProducts);
    }
  };

  const sortProducts = (ev) => {
    const criteria = ev.target.value;

    for (let prod of productsToDisplay) {
      prod.createdTime = new Date(prod.createdAt).getTime();
    }

    if (criteria === "price-asc") {
      const sortedProducts = [...productsToDisplay].sort(
        (a, b) => a.price - b.price
      );
      setProductsToDisplay(sortedProducts);
    } else if (criteria === "price-desc") {
      const sortedProducts = [...productsToDisplay].sort(
        (a, b) => b.price - a.price
      );
      console.log(sortedProducts);
      setProductsToDisplay(sortedProducts);
    } else if (criteria === "_id-desc") {
      const sortedProducts = [...productsToDisplay].sort(
        (a, b) => b.createdTime - a.createdTime
      );
      setProductsToDisplay(sortedProducts);
    } else if (criteria === "_id-asc") {
      const sortedProducts = [...productsToDisplay].sort(
        (a, b) => a.createdTime - b.createdTime
      );
      setProductsToDisplay(sortedProducts);
    }
  };

  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
          <h1>{category.name}</h1>
          <FiltersWrapper>
            <Filter>
              <span>Author:</span>
              <select onChange={filterByAuthors}>
                <option value="all">All</option>
                {authorsToDisplay.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </Filter>
            <Filter>
              <span>Sort:</span>
              <select onChange={sortProducts}>
                <option value="price-asc">Price-lowest first</option>
                <option value="price-desc">Price-highest first</option>
                <option value="_id-desc">Newest first</option>
                <option value="_id-asc">Oldest first</option>
              </select>
            </Filter>
          </FiltersWrapper>
        </CategoryHeader>

        <ProductsGrid products={productsToDisplay} />
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const catIds = [category._id];
  const products = await Product.find({ category: catIds });

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
