document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the hyperlink data from local storage or IndexedDB
    retrieveHyperlinksFromStorage().then((hyperlinkData) => {
      // Display the detailed hyperlink information
      const detailsContainer = document.getElementById('hyperlink-details');
      for (const [url, count] of Object.entries(hyperlinkData.hyperlinks)) {
        const link = document.createElement('div');
        link.textContent = `${url} (${count} occurrences)`;
        detailsContainer.appendChild(link);
      }
    });
  });
  