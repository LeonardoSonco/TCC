import Footer from "../components/Footer";
import Header from "../components/Header";

const PublicLayout = ({ children }:any ) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
