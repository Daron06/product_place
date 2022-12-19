import Cookies from 'js-cookie';

export function deleteCookie(name: string): void {
  Cookies.remove(name, { domain: 'localhost' });
  Cookies.remove(name, { domain: '.unknown.me' });
  Cookies.remove(name, { domain: 'dev.unknown.me' });
}

export function setCookie(name: string, value: string, force = false, days = 60): void {
  if (!force && document.cookie.includes(`${name}=`)) {
    return;
  }

  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

export function getCookie(name: string, value?: string): string | null {
  const nameEQ = `${name}=`;
  const params = value ? value.split(';') : [];
  for (let i = 0; i < params.length; i++) {
    let param = params[i];
    while (param.charAt(0) === ' ') {
      param = param.substring(1, param.length);
    }
    if (param.indexOf(nameEQ) === 0) {
      return param.substring(nameEQ.length, param.length);
    }
  }
  return null;
}
