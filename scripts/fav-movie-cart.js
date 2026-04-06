// load saved cart from localStorage if exists
const savedCart = localStorage.getItem('movieCart');
export const movieCart = savedCart ? JSON.parse(savedCart) : [];

