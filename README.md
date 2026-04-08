🎬 Movie Search

Live Demo:
https://blessing-d3velop.github.io/Movie-Search/

A responsive Movie & Series Search Web App that allows users to search, sort, and add movies or series to a personal watchlist. Data is fetched from the OMDb API, and the watchlist is stored in localStorage to persist across sessions.

🖼 Screenshots


Screenshots of the home page with movie cards and search bar.
<img width="1362" height="634" alt="Screenshot 2026-04-08 152519" src="https://github.com/user-attachments/assets/8f1beeb9-1a56-4b01-bbc0-1bd7de9d1d47" />
<img width="1365" height="634" alt="Screenshot 2026-04-08 152613" src="https://github.com/user-attachments/assets/ed7708d9-e480-484b-ae37-2c5ef4caaba6" />
<img width="1359" height="637" alt="Screenshot 2026-04-08 152901" src="https://github.com/user-attachments/assets/2c3c5c4d-f88f-4a8a-8972-71d1e1b2fb24" />

Screenshots showing watchlist functionality.
<img width="1358" height="639" alt="Screenshot 2026-04-08 153136" src="https://github.com/user-attachments/assets/0bbbb68b-0e1f-4728-bde0-b88f8831b014" />
<img width="1354" height="636" alt="Screenshot 2026-04-08 153207" src="https://github.com/user-attachments/assets/0070117a-5685-4ed2-849d-aaa129dfacbe" />
<img width="1361" height="634" alt="Screenshot 2026-04-08 153237" src="https://github.com/user-attachments/assets/d4410857-97e0-4425-95d7-36d81024b473" />
<img width="1358" height="640" alt="Screenshot 2026-04-08 153257" src="https://github.com/user-attachments/assets/669f76d8-895c-42fb-886d-4c197c962849" />
<img width="1361" height="634" alt="Screenshot 2026-04-08 153316" src="https://github.com/user-attachments/assets/dcb9c806-8356-42d6-bfb0-231055674ce6" />
<img width="1360" height="632" alt="Screenshot 2026-04-08 153335" src="https://github.com/user-attachments/assets/0c8ca596-d319-4bd6-835e-15b0b04ed7da" />

Screenshots showing movies and tv=list/series and loading funtionality.
Movies:
<img width="1355" height="626" alt="Screenshot 2026-04-08 153533" src="https://github.com/user-attachments/assets/75bbbc4e-99c2-42a6-be0a-d797a6f9ff4e" />
<img width="1365" height="635" alt="Screenshot 2026-04-08 153615" src="https://github.com/user-attachments/assets/78ee47ff-3cef-4b30-97a8-e387cdeb77e6" />
<img width="1364" height="631" alt="Screenshot 2026-04-08 153628" src="https://github.com/user-attachments/assets/40351751-aa22-4e68-a99c-c2ba8dc1d0b5" />
<img width="1359" height="632" alt="Screenshot 2026-04-08 153723" src="https://github.com/user-attachments/assets/c73a0783-6f58-4290-8910-b0436a274c20" />
<img width="1352" height="635" alt="Screenshot 2026-04-08 153739" src="https://github.com/user-attachments/assets/6f8076b2-c2f2-417a-94a5-7485c8a0f686" />
<img width="1365" height="638" alt="Screenshot 2026-04-08 153753" src="https://github.com/user-attachments/assets/8d0f3e9b-6bb7-4d9f-a435-dfe4bf21f1eb" />

Tv-shows/Series:
<img width="1358" height="638" alt="Screenshot 2026-04-08 153925" src="https://github.com/user-attachments/assets/64d676dd-efc5-45bc-8d85-f30947977cd7" />
<img width="1360" height="634" alt="Screenshot 2026-04-08 154000" src="https://github.com/user-attachments/assets/193e0cd4-889d-470c-9a32-d85f22133c51" />
<img width="1357" height="638" alt="Screenshot 2026-04-08 154019" src="https://github.com/user-attachments/assets/a467e568-f75b-49e4-b133-5eebc0a7a54a" />
<img width="1365" height="635" alt="Screenshot 2026-04-08 154038" src="https://github.com/user-attachments/assets/1fde8125-d537-437a-9eb9-3cc1f29d9e8c" />

Responsive Functionality:

https://github.com/user-attachments/assets/37ea10df-293a-44d8-a76e-773fb1ffbceb

Features
Search for movies and series dynamically.
Sort by title (A-Z) or release year (Newest/Oldest).
Add or remove movies/series to a personal watchlist.
Watchlist persists using localStorage.
Responsive grid layout for mobile and desktop.
Navigation between Movies, Series, and My List pages.
Loading state while fetching data from API.

Challenges Faced / Solved
Fetching and displaying data from OMDb API
Challenge: Handling multiple search queries asynchronously without overwriting results.
Solution: Used async/await loops and combined all results into one array before rendering.
Watchlist persistence
Challenge: Making search and sort work together seamlessly.
Solution: Filtered and sorted the same array before rendering, updating the UI dynamically.
Loading state management

🛠 Technologies Used
HTML5 & CSS3
JavaScript (ES6 Modules)
OMDb API for movie/series data
LocalStorage for watchlist persistence
Responsive Grid & Flexbox

Getting Started
1. Clone the repository
git clone https://github.com/Blessing-D3velop/Movie-Search.git
cd Movie-Search
2. Open in your browser

Simply open index.html in any modern browser.

3. Optional: Serve locally

You can use VSCode Live Server:


License

This project is licensed under the MIT License.
