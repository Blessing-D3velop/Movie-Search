const hamburger = document.querySelector('.hamburger');
const navBar = document.querySelector('.js-navigation-bar');

// Helper function to check if hamburger is visible
const isHamburgerVisible = () => window.getComputedStyle(hamburger).display !== 'none';

// Toggle menu when hamburger is clicked
hamburger.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent body click from firing immediately

  if (navBar.style.display === 'flex') {
    navBar.style.display = 'none';
  } else {
    navBar.style.display = 'flex';
    navBar.style.flexDirection = 'column';
    navBar.style.position = 'absolute';
    navBar.style.top = '60px';
    navBar.style.right = '30px';
    navBar.style.backgroundColor = 'rgba(10, 15, 25, 0.9)';
    navBar.style.padding = '15px';
    navBar.style.borderRadius = '10px';
    navBar.style.gap = '5px';
  }
});

// Close menu when a nav item is clicked (only if hamburger is visible)
const navItems = navBar.querySelectorAll('p');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (isHamburgerVisible()) navBar.style.display = 'none';
  });
});

// Close menu when clicking anywhere outside (only if hamburger is visible)
document.addEventListener('click', (e) => {
  if (isHamburgerVisible() && !navBar.contains(e.target) && !hamburger.contains(e.target)) {
    navBar.style.display = 'none';
  }
});

// Reset inline styles on resize
window.addEventListener('resize', () => {
  navBar.removeAttribute('style'); 
});