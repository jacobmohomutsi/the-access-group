import { gql } from "graphql-request";

export const HOME_QUERY = gql`
  {
    page(id: "the-access-group", idType: URI) {
      title

      homeHero {
        badgeText

        heroTitle
        heroDescription

        primaryButtonText
        primaryButtonLink

        secondaryButtonText
        secondaryButtonLink

        herocard1title
        herocard1body

        herocard2title
        herocard2body

        herocard3title
        herocard3body

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
      }
      homeAbout {
        eyebrow
        title

        description1

        card1Title
        card1Body

        card2Title
        card2Body

        card3Title
        card3Body

        card4Title
        card4Body
      }
      homeProducts {
        eyebrow
        title
        description

        product1Title
        product1Price
        product1Description
        product1Feature

        product2Title
        product2Price
        product2Description
        product2Feature

        product3Title
        product3Price
        product3Description
        product3Feature

        product4Title
        product4Price
        product4Description
        product4Feature

        product5Title
        product5Price
        product5Description
        product5Feature

        product6Title
        product6Price
        product6Description
        product6Feature

        product7Title
        product7Price
        product7Description
        product7Feature

        product8Title
        product8Price
        product8Description
        product8Feature
      }
      homeFeature {
        eyebrow
        title
        description
        points
      }
      homeCaseStudies {
        eyebrow
        title
        description1

        card1Badge
        card1Title
        card1Body

        card2Badge
        card2Title
        card2Body

        card3Badge
        card3Title
        card3Body
      }
      homeProjects {
        eyebrow
        title
        description1

        card1Title
        card1Body

        card2Title
        card2Body

        card3Title
        card3Body

        card4Title
        card4Body
      }
      homeCTA {
        badgeText

        heroTitle
        heroDescription

        primaryButtonText
        primaryButtonLink

        secondaryButtonText
        secondaryButtonLink
      }
    }
  }
`;