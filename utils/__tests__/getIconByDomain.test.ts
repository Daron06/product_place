import { getIconByDomain } from '../getIconByDomain';

describe('All okay', () => {
  it('Facebook', () => {
    expect(getIconByDomain('https://facebook.com/asdasd/123123')).toEqual('facebook');
    expect(getIconByDomain('https://facebook.com/')).toEqual('facebook');
    expect(getIconByDomain('http://facebook.com/')).toEqual('facebook');
    expect(getIconByDomain('https://www.facebook.com/unknown')).toEqual('facebook');
    expect(getIconByDomain('https://www.facebook.com/groups/ingternet')).toEqual('facebook');
    expect(getIconByDomain('https://www.fb.com/groups/ingternet')).toEqual('facebook');
    expect(getIconByDomain('https://fb.com/groups/ingternet')).toEqual('facebook');
  });

  it('instagram', () => {
    expect(getIconByDomain('https://instagram.com/unknown')).toEqual('instagram');
    expect(getIconByDomain('https://www.instagram.com/p/B37W35Xojdy/')).toEqual('instagram');
  });

  it('youtube', () => {
    expect(getIconByDomain('https://www.youtube.com/channel/UClQbI0nhI2CDSngH0PVyNKg')).toEqual('youtube');
    expect(getIconByDomain('https://youtube.com/c/UClQbI0nhI2CDSngH0PVyNKg')).toEqual('youtube');
    expect(getIconByDomain('https://youtu.be/C_3ZT7j1_jc')).toEqual('youtube');
  });

  it('linkedin', () => {
    expect(getIconByDomain('https://linkedin.com/company/70232761/admin')).toEqual('linkedin');
    expect(getIconByDomain('https://www.linkedin.com/company/70232761/admin')).toEqual('linkedin');
    expect(
      getIconByDomain(
        'https://www.linkedin.com/search/results/people/?currentCompany=%5B%2270232761%22%5D&origin=COMPANY_PAGE_CANNED_SEARCH',
      ),
    ).toEqual('linkedin');
    expect(getIconByDomain('https://www.linkedin.com/in/bassel-siblini-44790313/')).toEqual('linkedin');
  });

  it('twitter', () => {
    expect(getIconByDomain('https://twitter.com/getunknown')).toEqual('twitter');
    expect(getIconByDomain('https://www.twitter.com/getunknown')).toEqual('twitter');
    expect(getIconByDomain('http://www.twitter.com/getunknown')).toEqual('twitter');
  });

  it('tiktok', () => {
    expect(getIconByDomain('https://www.tiktok.com/@getunknown?lang=en')).toEqual('tiktok');
    expect(getIconByDomain('https://tiktok.com/@getunknown?lang=en')).toEqual('tiktok');
    expect(getIconByDomain('https://www.tiktok.com/@getunknown')).toEqual('tiktok');
  });
});

describe('Incorrect links', () => {
  it('Facebook', () => {
    expect(getIconByDomain('https://1facebook.com/asdasd/123123')).toBeNull();
    expect(getIconByDomain('https://ig.com/unknown')).toBeNull();
    expect(getIconByDomain('https://www.yobtube.de/channel/UClQbI0nhI2CDSngH0PVyNKg')).toBeNull();
    expect(getIconByDomain('https://facebook-emirates.com/company/70232761/admin')).toBeNull();
    expect(getIconByDomain('https://good-aed-site.com/getunknown')).toBeNull();
    expect(getIconByDomain('https://google.com/@getunknown?lang=en')).toBeNull();
  });
});
