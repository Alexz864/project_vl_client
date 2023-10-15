import Button from "@/components/Button.js";
import Center from "@/components/Center.js";
import Header from "@/components/Header.js";
import Footer from "@/components/Footer.js";
import WhiteBox from "@/components/WhiteBox.js";
import Input from "@/components/Input.js";
import { useSession, signOut, signIn } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner.js";
import ProductBox from "@/components/ProductBox.js";
import Tabs from "@/components/Tabs.js";
import SingleOrder from "@/components/SingleOrder.js";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }
  table tr.subtotal td {
    padding: 15px 0;
  }
  table tbody tr.subtotal td:nth-child(2) {
    font-size: 1.4rem;
  }
  tr.total td {
    font-weight: bold;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Orders");
  const [orders, setOrders] = useState([]);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    await signIn("google");
  }

  function saveAddress() {
    const data = {
      name,
      lastName,
      email,
      city,
      postalCode,
      streetAddress,
      country,
    };
    axios.put("/api/address", data);
  }

  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);

    axios.get("/api/address").then((res) => {
      if (res.data === null) {
        setAddressLoaded(true);
        return ;
      }
      setName(res.data.name);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
      setCity(res.data.city);
      setPostalCode(res.data.postalCode);
      setStreetAddress(res.data.streetAddress);
      setCountry(res.data.country);
      setAddressLoaded(true);
    });
    axios.get("/api/wishlist").then((res) => {
      setWishedProducts(res.data.map((wp) => wp.product));
      setWishlistLoaded(true);
    });
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
      setOrderLoaded(true);
    });
  }, [session]);

  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p._id.toString() !== idToRemove)];
    });
  }

  return (
    <>
      <Header />
      <Center>
      <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <WhiteBox>
              <Tabs
                tabs={["Orders", "Wishlist"]}
                active={activeTab}
                onChange={setActiveTab}
              />
              {activeTab === "Orders" && (
                <>
                  {!orderLoaded && <Spinner fullWidth={true} />}
                  {orderLoaded && (
                    <div>
                      {orders.length === 0 && <p>Login to see your orders</p>}
                      {orders.length > 0 &&
                        orders.map((o) => <SingleOrder key={o._id} {...o} />)}
                    </div>
                  )}
                </>
              )}
              {activeTab === "Wishlist" && (
                <>
                  {!wishlistLoaded && <Spinner fullWidth={true} />}
                  {wishlistLoaded && (
                    <>
                      <WishedProductsGrid>
                        {wishedProducts.length > 0 &&
                          wishedProducts.map((wp) => (
                            <ProductBox
                              key={wp._id}
                              {...wp}
                              wished={true}
                              onRemoveFromWishlist={productRemovedFromWishlist}
                            />
                          ))}
                      </WishedProductsGrid>
                      {wishedProducts.length === 0 && (
                        <>
                          {session && <p>Your wishlist is empty</p>}
                          {!session && (
                            <p>Login to add products to your wishlist</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </WhiteBox>
          </RevealWrapper>

          <RevealWrapper delay={100}>
          <WhiteBox>
              <h2>{session ? "Account details" : "Login"}</h2>
              {!addressLoaded && <Spinner fullWidth={true} />}

              {addressLoaded && session && (
                <>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="LastName"
                    value={lastName}
                    name="lastName"
                    onChange={(ev) => setLastName(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                  <CityHolder>
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      name="city"
                      onChange={(ev) => setCity(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      name="postalCode"
                      onChange={(ev) => setPostalCode(ev.target.value)}
                    />
                  </CityHolder>
                  <Input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Country"
                    value={country}
                    name="country"
                    onChange={(ev) => setCountry(ev.target.value)}
                  />
                  <Button
                    block={1}
                    black={1}
                    type="submit"
                    onClick={saveAddress}
                  >
                    Save
                  </Button>
                  <hr />
                </>
              )}

              {session && (
                <Button primary={1} onClick={logout}>
                  Logout
                </Button>
              )}
              {!session && (
                <Button primary={1} onClick={login}>
                  Login with Google
                </Button>
              )}
            </WhiteBox>
          </RevealWrapper>
        </ColumnsWrapper>
      </Center>
      <Footer />
    </>
  );
}
