// Function to create and show the modal
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
    
    // Append modal to the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  
    // Apply blur to the page
    document.documentElement.style.filter = 'blur(5px)';
  
    // Event listener to dismiss the modal
    const dismissButton = document.getElementById('dismiss-modal');
    if (dismissButton) {
      dismissButton.addEventListener('click', () => {
          document.documentElement.style.filter = 'none'; // Remove blur
        });
    }