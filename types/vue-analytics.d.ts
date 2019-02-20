// https://qiita.com/geerpm/items/ae4f3df8703d31236968
import _Vue, { PluginFunction } from "vue";

declare class VueAnalytics {
  analyticsMiddleware: any;
  onAnalyticsReady: any;
  event: any;
  ecommerce: any;
  set: any;
  page: any;
  query: any;
  screenview: any;
  time: any;
  require: any;
  exception: any;
  social: any;
  static install(Vue: typeof _Vue, options: any): void;
}

declare module "vue-analytics" {
  export default VueAnalytics;
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends _Vue> {
    ga?: VueAnalytics;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $ga: VueAnalytics;
  }
}
