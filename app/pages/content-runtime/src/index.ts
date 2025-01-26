

// Create a wrapper around the entire page content
console.log('Creating page wrapper');
const pageWrapper = document.createElement('div');
pageWrapper.id = 'page-wrapper';
pageWrapper.style.position = 'relative';
pageWrapper.style.filter = 'blur(5px)';
pageWrapper.style.transition = 'filter 0.3s ease';

// Move all existing content into the wrapper
while (document.body.firstChild) {
  pageWrapper.appendChild(document.body.firstChild);
}
document.body.appendChild(pageWrapper);

// Create modal HTML
const modalHTML = `
  <div id="study-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.8); display: flex; justify-content: center; align-items: center; z-index: 9999;">
    <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; width: 80%; max-width: 400px;">
      <h2>Content is not related to your study topic</h2>
      <textarea id="justification" placeholder="Enter justification (optional)" style="width: 100%; height: 100px; margin-bottom: 10px;"></textarea>
      <br>
      <button id="dismiss-modal" style="background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px;">Dismiss</button>
    </div>
  </div>
`;

// Append modal to the body (outside the wrapper)
document.body.insertAdjacentHTML('beforeend', modalHTML);

// Event listener to dismiss the modal
const dismissButton = document.getElementById('dismiss-modal');
if (dismissButton) {

    dismissButton.addEventListener('click', () => {

    // Remove the modal
    const modal = document.getElementById('study-modal');
    if (modal) modal.remove();

    // Remove blur by moving content back to the body
    while (pageWrapper.firstChild) {
      document.body.appendChild(pageWrapper.firstChild);
    }
      pageWrapper.remove();
      
      chrome.runtime.sendMessage({ action: 'dismissed'}, response => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError);
        } else {
          console.log('Message sent successfully:', response);
        }
      });
  });
    console.log('attempting update');
  
}   