
export class WorkItem {
  title: string;
  subtitle: string;
  link: string;
  details: string;
  body: string;
  category: string;
  date: number;
  thumbnail: string;
  imagesUrl: Array<Image>;
  cover: string;
  videoId: string;
  duration: string;
  startSeconds: number;
  endSeconds: number;
  
  constructor(init?: Partial<WorkItem>) {
    Object.assign(this, init);
  }

}
