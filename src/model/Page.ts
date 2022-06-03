import type WordpressItem from "./WordpressItem";

export default interface Page extends WordpressItem {
  parent: number;
  menu_order: number;
}
