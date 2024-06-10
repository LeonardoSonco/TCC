
import Footer from "../components/Footer";
import Header from "../components/Header";

const PrivateLayout = ({ children }:any) => {
    return <>
    <Header isExecutionEnvironment= {true}/>
      {children}
      <Footer />
    </>
}

export default PrivateLayout;