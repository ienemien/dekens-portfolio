import type WordpressItem from "./WordpressItem";

export default interface BlogPost extends WordpressItem {
  sticky: boolean;
}
