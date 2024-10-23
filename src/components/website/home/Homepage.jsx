import Footer from "../partials/Footer.jsx";
import Cart from "./Cart.jsx";
import HomeBanner from "./HomeBanner.jsx";
import HomeHappyHour from "./HomeHappyHour.jsx";
import HomeInstruction from "./HomeInstruction.jsx";
import HomeMenu from "./HomeMenu.jsx";
import HomeSlider from "./HomeSlider.jsx";

const Homepage = () => {
  return (
    <>
      <HomeBanner />
      <HomeInstruction />
      <HomeMenu />
      <HomeHappyHour />
      <HomeSlider />
      <Footer />
      <Cart />
    </>
  );
};

export default Homepage;
