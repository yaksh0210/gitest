const products = document.querySelectorAll('.product');
const dropzone = document.getElementById('dropzone');

products.forEach(product => {
  product.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', product.id);
  });
});

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.style.backgroundColor = '#d0ffd0';
});

dropzone.addEventListener('dragleave', () => {
  dropzone.style.backgroundColor = '#f8f8f8';
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  const productId = e.dataTransfer.getData('text/plain');
  dropzone.style.backgroundColor = '#f8f8f8';

  // Trigger GitHub Action
  fetch(`https://api.github.com/repos/yaksh0210/gitest/dispatches`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ',
      'Accept': 'application/vnd.github.everest-preview+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      event_type: 'trigger-product',
      client_payload: {
        product: productId
      }
    })
  }).then(response => {
    if (response.ok) {
      alert(`Pipeline triggered for ${productId}`);
    } else {
      alert('Failed to trigger pipeline');
    }
  });
});
