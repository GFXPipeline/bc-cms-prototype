import styled from "styled-components";

// Global components
import Header from "../../components/Header";

// Page components
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";
import { ContentMaintenance } from "./Sections";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Dashboard({ section }) {
  return (
    <Page>
      <Header />
      <SearchBar />
      <Navigation />
      {section === "content-maintenance" && <ContentMaintenance />}
    </Page>
  );
}

export default Dashboard;
