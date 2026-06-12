import { gql } from "graphql-request";

export const SUMMIT_QUERY = gql`
  {
    homePage: page(id: "new-home", idType: URI) {
      homeHero {
        partner1name
        partner1logo {
          node {
            sourceUrl
            altText
          }
        }

        partner2name
        partner2logo {
          node {
            sourceUrl
            altText
          }
        }

        partner3name
        partner3logo {
          node {
            sourceUrl
            altText
          }
        }

        partner4name
        partner4logo {
          node {
            sourceUrl
            altText
          }
        }

        partner5name
        partner5logo {
          node {
            sourceUrl
            altText
          }
        }

        partner6name
        partner6logo {
          node {
            sourceUrl
            altText
          }
        }

        partner7name
        partner7logo {
          node {
            sourceUrl
            altText
          }
        }

        partner8name
        partner8logo {
          node {
            sourceUrl
            altText
          }
        }

        partner9name
        partner9logo {
          node {
            sourceUrl
            altText
          }
        }
      }
    }

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
