const clientId = 'b5247d9a2c2940598d6f0e48a44354c6';
const clientSecret = '040af4becded4a3d9bba2d99f96e3593';

const getAccessToken = async () => {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
            },
            body: 'grant_type=client_credentials',
        });
      
        const data = await response.json();
        const accessToken = data.access_token;
        return accessToken;
        } catch (error) {
            console.error('Error retrieving access token:', error.message);
        }
};
// const getRandomSongs = async () => {
//   try {
//     const accessToken = await getAccessToken();

//     const response = await fetch(
//       'https://api.spotify.com/v1/playlists/37i9dQZEVXbM8SIrkERIYl',
//       {
//         method: 'GET',
//         headers: {
//           Authorization: 'Bearer ' + accessToken,
//         },
//       }
//     );
//     const data = await response.json();
//     const items = data.tracks.items;
//     const songs = [];
//     for (let i = 0; i < items.length; i++) {
//       songs.push(items[i].track.name);
//     }
//     return songs;
//   } catch (error) {
//     console.error('Error retrieving random songs:', error.message);
//   }
// };

const searchSongs = async (query, limit) => {
    try {
      const accessToken = await getAccessToken();
  
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );
  
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid access token');
      }
  
      const data = await response.json();
      const songs = data.tracks.items.map((item) => item.name);
      showSongs(songs);
    } catch (error) {
      console.error('Error searching songs:', error.message);
    }
  };
  
  const searchField = document.getElementById('searchField');
  const limitField = document.getElementById('limitField');
  const searchButton = document.getElementById('searchButton');
  
  searchButton.addEventListener('click', () => {
    const query = searchField.value;
    const limit = parseInt(limitField.value, 10);
    if (query && limit) {
      searchSongs(query, limit);
    }
  });

const showSongs = async (songs) => {

    const element = document.getElementById("songlist");
    while (element.childElementCount > 0)
    {
        element.children[0].remove();
    }
    for (let i = 0; i < songs.length; i++)
    {
        const para = document.createElement("p");
        para.appendChild(document.createTextNode(songs[i]));	
        element.appendChild(para);
    }
}

  