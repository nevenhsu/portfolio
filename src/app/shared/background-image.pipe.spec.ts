import { BackgroundImagePipe } from './background-image.pipe';
import { ImgurPipe } from 'shared/imgur.pipe';

describe('BackgroundImagePipe', () => {
  it('create an instance', () => {
    const pipe = new BackgroundImagePipe(null, new ImgurPipe());
    expect(pipe).toBeTruthy();
  });
});
