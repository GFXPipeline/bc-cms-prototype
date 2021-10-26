import styled from "styled-components";

// Global components
import Header from "../../components/Header";

// Page components
import SearchBar from "./SearchBar";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Dashboard() {
  return (
    <Page>
      <Header />
      <SearchBar />
    </Page>
  );
}

export default Dashboard;
