import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PostMetaData = {
  readOnlyFields;
}

export declare class Post {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly source?: string | null;
  readonly youtubeVideoId?: string | null;
  readonly muscles: string[];
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}