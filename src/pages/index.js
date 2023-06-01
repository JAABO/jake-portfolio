import React from "react";
import {
  Animation,
  HeroSection,
  Page,
  Seo,
} from "gatsby-theme-portfolio-minimal";


import DonationForm from "../donatebutton";
import TransactionsList from "../transactionlist";

export default function IndexPage() {

  return (
    <>
      <Seo title="Portfolio Minimal" />

      <Page useSplashScreenAnimation>
        <HeroSection sectionId="hero" />

        <Animation type="fadeUp">
          <DonationForm/>
        </Animation>

        <TransactionsList/>

      </Page>

    </>
  );
}
