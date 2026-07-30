// Detect when the element comes into view
document.addEventListener('DOMContentLoaded', function () {
    var horizontalLines = document.querySelectorAll('.horizontal-line');
    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Adjust threshold as needed
    };
  
    var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, options);
  
    horizontalLines.forEach(function (line) {
      observer.observe(line);
    });
  });
  