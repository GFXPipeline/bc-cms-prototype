import Header from "../../components/Header";
import PageRoutes from "../../components/Page";
import UserRoutes from "../../components/User";

function Home() {
  return (
    <>
      <Header />
      <UserRoutes />
      <PageRoutes />
    </>
  );
}

export default Home;
