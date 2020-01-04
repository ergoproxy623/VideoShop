import { HtmlSanitazePipe } from './html-sanitaze.pipe';

describe('HtmlSanitazePipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlSanitazePipe();
    expect(pipe).toBeTruthy();
  });
});
