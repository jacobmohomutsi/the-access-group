import { gql } from "graphql-request";

export const SUMMIT_QUERY = gql`
  {
    page(id: "ieas-summit-2026", idType: URI) {
      title

      summitHero {
        badgeText

        heroTitle
        heroDescription

        primaryButtonText
        primaryButtonLink

        secondaryButtonText
        secondaryButtonLink

        date
        location
      }

      summitSpeakers {
        eyebrow
        title
        description

        card1Image {
          node {
            sourceUrl
            altText
          }
        }

        card1Title
        card1Position
        card1Body

        card2Image {
          node {
            sourceUrl
            altText
          }
        }

        card2Title
        card2Position
        card2Body

        card3Image {
          node {
            sourceUrl
            altText
          }
        }

        card3Title
        card3Position
        card3Body

        card4Image {
          node {
            sourceUrl
            altText
          }
        }

        card4Title
        card4Position
        card4Body
      }
    }
  }
`;