const info = (res) => {
  const profile = document.querySelector(".profile");
  let html = "";
  html += `
     <div class = "profile-image">

     <img src = "${res.profile_image.large}"
   alt = "">

     </div>

     <div class = "profile-user-settings" >

     <h1 class = "profile-user-name" >${res.name}</h1>

     <button class = "btn profile-edit-btn" > Edit Profile </button>

     <button class = "btn profile-settings-btn"aria - label = "profile settings"> <i class = "fas fa-cog" aria - hidden = "true"> </i></button>

     </div>

     <div class = "profile-stats">

     <ul>
     <li> <span class = "profile-stat-count">${res.total_photos}  </span> posts</li>
     <li> <span class = "profile-stat-count"> ${res.followers_count} </span> followers</li>
     <li> <span class = "profile-stat-count"> ${res.following_count} </span> following</li>
     </ul>

     </div>

     <div class = "profile-bio">

     <p> <span class = "profile-real-name"> Jane Doe </span> Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️</p >

     </div>
    `
  profile.innerHTML = html;
};
const photo = (res) => {
  const gallery = document.querySelector(".gallery");
  let html = "";
  res.forEach((element) => {
    html += `
    
    	<div class = "gallery-item" tabindex = "0">
    			    <img src = "${element.urls.full}"class = "gallery-image"alt = "" >
    
    </div>
    `;
 });
  gallery.innerHTML = html;
};

const callAPI = async (username) => {
  try {
    console.log("username --> ", username);
    const response = await fetch("/api/searchUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const res = await response.json();
    //check response return from our API
    console.log("response ----> ", res);
    info(res);
  } catch (error) {
    console.log("message error --->", error);
    //Do Something
  }
};
const callphoto = async (username) => {
  try {
    console.log("username --> ", username);
    const response = await fetch("/api/photo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username
      })
    });
    const res = await response.json();
    //check response return from our API
    console.log("response ----> ", res);
    photo(res);
  } catch (error) {
    console.log("message error --->", error);
    //Do Something
  }
};


const main = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(queryString);
  const username = urlParams.get('username');
  if (urlParams.has('username')) {
    console.log(callAPI);
    callAPI(username);
    callphoto(username);
  } else {
    console.log("no username")
  }

};

main();
