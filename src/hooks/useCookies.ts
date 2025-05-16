import Cookies, { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const useCookies = () => {
  const getCookie = (name: string) => cookies.get(name);

  const setCookie = (name: string, value: string, options?: CookieSetOptions) => {
    cookies.set(name, value, options);
  };

  const removeCookie = (name: string) => {
    cookies.remove(name);
  };

  return { getCookie, setCookie, removeCookie };
};
