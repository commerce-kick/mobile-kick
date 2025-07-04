import { getSalesforceAPI } from "~/integrations/salesforce/server/config";
import {
  GetProductParams,
  SearchProductsParams,
} from "~/integrations/salesforce/types/params";
import { createCommerceFunction } from "~/integrations/salesforce/utils";

export const getProducts = createCommerceFunction(
  async (api, client, data: SearchProductsParams) => {
    const shopperSearch = await api.shopperSearch();
    return await shopperSearch.productSearch({
      parameters: data,
    });
  },
);

export const getProduct = createCommerceFunction(
  async (api, _, data: GetProductParams) => {
    const shopperProducts = await api.shopperProducts();
    return await shopperProducts.getProduct({
      parameters: {
        id: data.id,
        allImages: true,
        expand: data.expand || [
          "availability",
          "promotions",
          "options",
          "images",
          "prices",
          "variations",
          "set_products",
          "bundled_products",
        ],
      },
    });
  },
);

export const getProductsByIds = async ({ data }) => {
  const { api } = await getSalesforceAPI();
  const shopperProducts = await api.shopperProducts();
  return await shopperProducts.getProducts({
    parameters: {
      ids: data.ids,
      allImages: true,
      expand: data.expand || [
        "availability",
        "promotions",
        "options",
        "images",
        "prices",
        "variations",
      ],
    },
  });
};

export const getCategory = async ({ data }) => {
  const { api } = await getSalesforceAPI();
  const shopperProducts = await api.shopperProducts();
  return await shopperProducts.getCategory({
    parameters: {
      id: data.id,
      levels: data.levels || 2,
    },
  });
};
