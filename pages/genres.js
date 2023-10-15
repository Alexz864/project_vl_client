import Center from "@/components/Center.js";
import Header from "@/components/Header.js";
import Footer from "@/components/Footer.js";
import ProductBox from "@/components/ProductBox.js";
import { Category } from "@/models/Category.js";
import { Product } from "@/models/Product.js";
import Link from "next/link";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth].js";
import { WishedProduct } from "@/models/WishedProduct.js";
import { mongooseConnect } from "@/lib/mongoose.js";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Categorytitle = styled.div`
  display: flex;
  margin-top: 5px;
  margin-bottom: 0;
  align-items: center;
  gap: 15px;
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a {
    color: #555;
    display: inline-block;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 190px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #555;
  text-decoration: none;
`;

export default function GenrePage({
  categories,
  categoriesProducts,
  wishedProducts = [],
}) {
  return (
    <>
      <Header />
      <Center>
        {categories.map((cat) => (
          <CategoryWrapper key={cat._id}>
            <Categorytitle>
              <h2>{cat.name}</h2>
              <div>
                <Link href={"/genre/" + cat._id}>Show all</Link>
              </div>
            </Categorytitle>
            <CategoryGrid>
              {categoriesProducts[cat._id].map((p, index) => (
                <RevealWrapper key={index} delay={index * 50}>
                  <ProductBox {...p} wished={wishedProducts.includes(p._id)} />
                </RevealWrapper>
              ))}
              <RevealWrapper delay={categoriesProducts[cat._id].length * 50}>
                <ShowAllSquare href={"/genre/" + cat._id}>
                  Show all &rarr;
                </ShowAllSquare>
              </RevealWrapper>
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const categories = await Category.find();
  const categoriesProducts = {}; //catId => [products]
  const allFetchedProductsId = [];

  for (const cat of categories) {
    const products = await Product.find({ category: cat._id }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    allFetchedProductsId.push(...products.map((p) => p._id.toString()));
    categoriesProducts[cat._id] = products;
  }

  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: allFetchedProductsId,
      })
    : [];

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  };
}
