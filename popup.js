document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the hyperlink data from local storage or IndexedDB
    var hyperlinkData = retrieveHyperlinksFromStorage();
  
    // Update the popup content with the summary information
    document.getElementById('visited-sites').textContent = hyperlinkData.visitedSites;
    document.getElementById('hyperlinks').textContent = hyperlinkData.totalHyperlinks;
  
    // Add a click event listener to the "Show More Details" button
    document.getElementById('show-details').addEventListener('click', function() {
      chrome.tabs.create({ url: 'details.html' });
    });
  });
  
  function retrieveHyperlinksFromStorage() {
    try {
      // Retrieve the hyperlink data from local storage
      return new Promise((resolve, reject) => {
        chrome.storage.local.get('hyperlinks', function(data) {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message);
          } else {
            const hyperlinks = JSON.parse(data.hyperlinks || '{}');
  
            // Calculate the total number of visited sites and hyperlinks
            const visitedSites = Object.keys(hyperlinks).length;
            const totalHyperlinks = Object.values(hyperlinks).reduce((sum, count) => sum + count, 0);
  
            resolve({ visitedSites, totalHyperlinks });
          }
        });
      });
    } catch (error) {
      console.error('Error retrieving hyperlink data:', error);
      return { visitedSites: 0, totalHyperlinks: 0 };
    }
  }
  
  