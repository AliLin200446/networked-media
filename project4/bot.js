require("dotenv").config()

const m = require("masto")

const masto = m.createRestAPIClient({
    url:"https://networked-media.itp.io/",
    accessToken:process.env.TOKEN

})

// async function makeStatus(text){
//     const status = await masto.v1.statuses.create({
//         //thing that will be posted, modify:
//         status:text,
//         //change for testing purpose
//         visibility: "private",

//     })
//     console.log(status.url)
// }
// makeStatus("hi")

// setInterval( ()=>{
//     let emoji = ["📩","🥑","🥶"]

//     let rand = Math.floor(Math.random()*emoji.length)

//     let post = emoji[rand]

//     makeStatus(post)

// },5000)

async function getRandomArtwork() {
    try {
      const response = await fetch('https://api.artic.edu/api/v1/artworks?page=1&limit=100');
      const data = await response.json();
      const artworks = data.data;
  
      if (artworks.length > 0) {
        const randomIndex = Math.floor(Math.random() * artworks.length);
        const artwork = artworks[randomIndex];
        const title = artwork.title;
        const artworkUrl = `https://www.artic.edu/artworks/${artwork.id}`;
        const imageUrl = artwork.image_id
          ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
          : null;
  
        return { title, artworkUrl, imageUrl };
      }
    } catch (err) {
      console.error('Here is an error fetching artwork:', err);
      return null;
    }
  }
  
  async function postArtworkToMastodon() {
    const artwork = await getRandomArtwork();
  
    if (artwork) {
      const statusContent = `🎨 Hourly Artwork Exhibition: <${artwork.title}>\n\nStart your museum journey🔗👉: ${artwork.artworkUrl}`;
      const mediaIds = [];
  
      if (artwork.imageUrl) {
        try {
          const imageResponse = await fetch(artwork.imageUrl);
          const media = await masto.v1.mediaAttachments.create({
            file: imageResponse.body, 
            description: artwork.title,
          });
          mediaIds.push(media.id);
        } catch (err) {
          console.error('Here is an error uploading image:', err);
        }
      }
  
      const status = await masto.v1.statuses.create({
        status: statusContent,
        visibility: 'public',
        media_ids: mediaIds,
      });
  
      console.log('Posted:', status.url);
    }
  }
  
  //hourly
  setInterval(postArtworkToMastodon, 60 * 60 * 1000);
  postArtworkToMastodon();