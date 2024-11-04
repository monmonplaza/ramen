import React from "react";
import Footer from "../partials/Footer.jsx";
import Cart from "./Cart.jsx";
import HomeBanner from "./HomeBanner.jsx";
import HomeHappyHour from "./HomeHappyHour.jsx";
import HomeInstruction from "./HomeInstruction.jsx";
import HomeMenu from "./HomeMenu.jsx";
import HomeSlider from "./HomeSlider.jsx";

const Homepage = () => {
  const [cartItem, setCartItem] = React.useState([]);
  const [isShowCart, setIsShowCart] = React.useState(false);

  return (
    <>
      <HomeBanner setIsShowCart={setIsShowCart} cartItem={cartItem} />
      <HomeInstruction />
      <HomeMenu cartItem={cartItem} setCartItem={setCartItem} />
      <HomeHappyHour />
      <HomeSlider />
      <Footer />
      {isShowCart && (
        <Cart
          cartItem={cartItem}
          setCartItem={setCartItem}
          setIsShowCart={setIsShowCart}
        />
      )}
    </>
  );
};

export default Homepage;
