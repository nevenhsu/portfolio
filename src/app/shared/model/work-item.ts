
export class WorkItem {
  title: string;
  subtitle: string;
  brief: string;
  body: string;
  category: string;
  date: number;
  thumbnail: string;
  imagesUrl: Array<string>;
  cover: string;
  videoId: string;
  duration: string;
  startSeconds: number;
  endSeconds: number;
  
  constructor(init?: Partial<WorkItem>) {
    Object.assign(this, init);
  }

}
