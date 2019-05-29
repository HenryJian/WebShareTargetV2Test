addEventListener('install', () => {
    skipWaiting();
  });
  
  addEventListener('activate', () => {
    clients.claim();
  });
  
  addEventListener('fetch', (event) => {
    if (event.request.method !== 'POST') return;
    
    event.respondWith(fetch('./'));
    
    event.waitUntil(async function () {
      const data = await event.request.formData();
      const client = await self.clients.get(event.resultingClientId);
      const file = data.get('image_file');
      const ptext = data.get('ptext');
      const ptitle = data.get('ptitle');
      client.postMessage({ ptext, ptitle, file, action: 'blah' });
    }());
  });