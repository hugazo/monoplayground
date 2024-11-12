import { setHeaders } from 'h3';

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server && to.path.includes('dev')) {
    console.log('Setting headers for page');
    const event = useRequestEvent();
    if (event) {
      setHeaders(event, {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      });
    }
  }
});
