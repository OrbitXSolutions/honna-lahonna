import { PaginationParams } from "../pagination-request";
import { ServiceProviderVM } from "../vm/service-provider";

export interface ServiceProviderQuery
  extends PaginationParams<ServiceProviderVM> {}
