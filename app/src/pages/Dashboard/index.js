import { useState } from "react";
import styled from "styled-components";

// Global components
import Header from "../../components/Header";

// Page components
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Dashboard() {
  const [section, setSection] = useState("dashboard");

  return (
    <Page>
      <Header />
      <SearchBar />
      <Navigation section={section} setSection={setSection} />
    </Page>
  );
}

export default Dashboard;
