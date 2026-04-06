const hamburger = document.querySelector('.hamburger');
const navBar = document.querySelector('.js-navigation-bar');
const body = document.querySelector('body');

// Toggle menu
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();

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


// Reset inline styles on resize
window.addEventListener('resize', () => {
  navBar.removeAttribute('style'); 
});

document.querySelector('.js-my-list')
  .addEventListener('click', () => {
    window.open('my-list.html', '_blank', 'noopener,noreferrer');
  });