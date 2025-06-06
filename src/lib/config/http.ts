import ky from 'ky';
// import { checkLocaleAvaliability } from '$lib/utils/translation.js';
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get token from local storage
 */
function getLsToken(): string {
  let token = '';
  // if (localStorage.getItem('accessToken')) {
  //   const raw = localStorage.getItem('accessToken');
  //   if (raw) {
  //     token = JSON.parse(raw);
  //   }
  // }
  return token;
}

const http = ky.create({
  // credentials: 'include',
  prefixUrl: API_URL,

  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    "Accept": "application/json"
  },
  retry: {
    limit: 1,
    statusCodes: [401],
    methods: ['get', 'post'],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // Language header
        // const userLocale = localStorage && localStorage.getItem('locale') || "";
        // const userLocale = "";
        // const locale = checkLocaleAvaliability(userLocale);
        // request.headers.set('Accept-Language', locale);

        const token = getLsToken();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }

        // Bearer token header
        // const csrf = getCsrf();
        // request.headers.set('X-CSRF-TOKEN', csrf);
      },
    ],

    beforeError: [
			async (error) => {
        // if (error.response?.status === 401) {
        //   Do something;
        // }
				return error;
			}
    ],
  },
});

export default http;
