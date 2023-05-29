import React from "react";
import {Layout,
  Animation,
  AboutSection,
  ArticlesSection,
  ContactSection,
  HeroSection,
  InterestsSection,
  Page,
  ProjectsSection,
  Seo,
} from "gatsby-theme-portfolio-minimal";


import PaymentForm from "../donatebutton";

export default function IndexPage() {

  return (
    <>
      <Seo title="Portfolio Minimal" />

      <Page useSplashScreenAnimation>
        <HeroSection sectionId="hero" />
        {/* <ArticlesSection sectionId="articles" heading="Latest Articles" sources={['Medium']} /> */}
        {/* <AboutSection sectionId="about" heading="About Portfolio Minimal" /> */}
        {/* <InterestsSection sectionId="details" heading="Details" />
        <ProjectsSection sectionId="features" heading="Built-in Features" />*/}

        {/* <ContactSection sectionId="github" heading="Donation" /> */}
        <Animation type="fadeUp">
          <PaymentForm/>
        </Animation>
      </Page>

    </>
  );
}
