import Center from "@/components/Center.js";
import Header from "@/components/Header.js";
import Footer from "@/components/Footer.js";
import ProductsGrid from "@/components/ProductsGrid.js";
import Title from "@/components/Title.js";
import { mongooseConnect } from "@/lib/mongoose.js";
import { Product } from "@/models/Product.js";
import { authOptions } from "./api/auth/[...nextauth].js";
import { getServerSession } from "next-auth/next";
import { WishedProduct } from "@/models/WishedProduct.js";

export default function BooksPage({ products, wishedProducts }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All books</Title>
        <ProductsGrid products={products} wishedProducts={wishedProducts} />
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: products.map((p) => p._id.toString()),
      })
    : [];
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  };
}
