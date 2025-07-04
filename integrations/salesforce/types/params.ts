import type {
  ShopperBasketsTypes,
  ShopperCustomersTypes,
} from "commerce-sdk-isomorphic";
import { Address } from "~/integrations/salesforce/types/api";

export interface SalesforceConfig {
  clientId: string;
  organizationId: string;
  siteId: string;
  shortCode: string;
  locale?: string;
  currency?: string;
}

export interface IntegrationConfig {
  parameters: SalesforceConfig;
}

export interface SalesforceSessionData {
  accessToken: string;
  refreshToken?: string;
  tokenExpiry: number;
  customerId?: string;
  usid?: string;
}

export interface ProductSearchParams {
  select?: string;
  q?: string;
  refine?: string[];
  sort?: string;
  currency?: string;
  locale?: string;
  expand?: string[];
  allImages?: boolean;
  perPricebook?: boolean;
  allVariationProperties?: boolean;
  offset?: any;
  limit?: number;
}

export interface CustomerOrdersParams {
  crossSites?: boolean;
  from?: string;
  until?: string;
  status?: string;
  offset?: any;
  limit?: number;
}

export interface SearchProductsParams {
  select?: string;
  q?: string;
  refine?: Array<string>;
  sort?: string;
  currency?: string;
  locale?: string;
  expand?: Array<string>;
  allImages?: boolean;
  perPricebook?: boolean;
  allVariationProperties?: boolean;
  offset?: any;
  limit?: number;
}

export interface GetProductParams {
  id: string;
  select?: string;
  inventoryIds?: string;
  currency?: string;
  expand?: Array<string>;
  locale?: string;
  allImages?: boolean;
  perPricebook?: boolean;
}

export interface GetProductsByIdsParams {
  select?: string;
  ids: string;
  inventoryIds?: string;
  currency?: string;
  expand?: string[];
  locale?: string;
  allImages?: boolean;
  perPricebook?: boolean;
}

export interface AddItemToBasketParams {
  body: ShopperBasketsTypes.ProductItem[];
}
export interface UpdateShippingAddressForShipmentParams {
  params: {
    basketId: string;
    shipmentId: string;
    useAsBilling?: boolean;
    removeExternalTax?: boolean;
  };
  body: ShopperBasketsTypes.OrderAddress;
}

export interface UpdateBillingAddressForBasketParams {
  params: {
    basketId: string;
    shipmentId: string;
    useAsBilling?: boolean;
    removeExternalTax?: boolean;
  };
  body: ShopperBasketsTypes.OrderAddress;
}

export interface UpdateShippingMethodParams {
  params: {
    basketId: string;
    shipmentId: string;
  };
  body: ShopperBasketsTypes.ShippingMethod;
}

export interface UpdateShippingMethodForShipmentParams {
  params: {
    basketId: string;
    shipmentId: string;
  };
  body: ShopperBasketsTypes.ShippingMethod;
}

export interface AddPaymentInstrumentToBasketParams {
  params: {
    basketId: string;
  };
  body: ShopperBasketsTypes.OrderPaymentInstrument;
}

export interface CreateOrderParams {
  params?: {};
  body: ShopperBasketsTypes.Basket;
}

export interface SearchSuggestionsParams {
  q: string;
  limit?: number;
  currency?: string;
  locale?: string;
}

export interface CreateCustomerAddressParams {
  params?: {};
  body: Address;
}

export interface CreateCustomerPaymentInstrumentParams {
  params?: {};
  body: ShopperCustomersTypes.CustomerPaymentInstrumentRequest;
}

export interface AddressCallback {
  address: Address;
  saveAddress?: boolean;
  setAsDefault?: boolean;
}

export interface GetPageParams {
  pageId: string;
  aspectAttributes?: string;
  parameters?: string;
}
