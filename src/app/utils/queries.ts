const gql = String.raw;

export const shopQuery = gql`
  query Shop {
    shop {
      name
    }
  }
`;

export const productsQuery = gql`
  query Products {
    products(first: 50) {
      edges {
        node {
          title
          handle
          id
          featuredImage {
            id
            url
            altText
          }
          availableForSale
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          isGiftCard
        }
      }
    }
  }
`;

export const productQuery = gql`
  query SingleProduct($handle: String!) {
    product(handle: $handle) {
      title
      handle
      requiresSellingPlan
      description
      id
      productType
      options {
        name
        values
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      tags
      featuredImage {
        id
        url
        altText
      }
      seo {
        title
      }
      availableForSale
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      isGiftCard
      variants(first: 10) {
        edges {
          node {
            id
            title
            image {
              url
              altText
              id
            }
            quantityAvailable
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              value
              name
            }
            metafields(
              identifiers: { namespace: "custom", key: "image_list" }
            ) {
              value
            }
          }
        }
      }
    }
  }
`;

export const createCartQuery = gql`
  mutation CreateCcart {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

export const addItemToCartMutation = gql`
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
        }
        checkoutUrl
        id
        lines(first: 10) {
          edges {
            node {
              quantity
              id
              merchandise {
                ... on ProductVariant {
                  id
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                  title
                  image {
                    altText
                    url
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getCartQuery = gql`
  query FetchCart($id: ID!) {
    cart(id: $id) {
      checkoutUrl
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
      }
      totalQuantity
      id
      lines(first: 10) {
        edges {
          node {
            merchandise {
              ... on ProductVariant {
                id
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                title
                image {
                  url
                  altText
                }
                product {
                  title
                }
              }
            }
            quantity
          }
        }
      }
    }
  }
`;
