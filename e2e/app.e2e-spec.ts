import { CoolProjPage } from './app.po';

describe('cool-proj App', () => {
  let page: CoolProjPage;

  beforeEach(() => {
    page = new CoolProjPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
