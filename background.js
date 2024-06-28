chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
      var url = tabs[0].url;
      // Retrieve and process the hyperlinks on the page
      var hyperlinks = extractHyperlinks(url);
      storeHyperlinks(hyperlinks);
    });
  });
  

  async function extractHyperlinks(url) {
    try {
      // Fetch the HTML content of the page
      const response = await fetch(url);
      const html = await response.text();
  
      // Parse the HTML content to extract hyperlinks
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const links = doc.getElementsByTagName('a');
  
      // Create an object to store the hyperlink URLs and their occurrence counts
      const hyperlinks = {};
  
      // Iterate through the links and count the occurrences
      for (let i = 0; i < links.length; i++) {
        const href = links[i].getAttribute('href');
        if (href) {
          if (hyperlinks[href]) {
            hyperlinks[href]++;
          } else {
            hyperlinks[href] = 1;
          }
        }
      }
  
      return hyperlinks;
    } catch (error) {
      console.error('Error extracting hyperlinks:', error);
      return {};
    }
  }
  

function storeHyperlinks(hyperlinks) {
  // Store the hyperlink data in the browser's local storage or IndexedDB
  chrome.runtime.connectNative('com.example.hyperlink_tracker')
    .postMessage(JSON.stringify({ hyperlinks: hyperlinks }));
}
  
  