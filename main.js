getCredentials(function() {
  console.log('got credentials');
});
var mainImage = getMainImageSrc();
var accessToken = localStorage.getItem('accessToken');

messWithNumbers();

function getImageTags () {
	return postImage(mainImage)
	.then(function(tags) {
    return tags;
	});
}

getImageTags()
.then(function(tags) {
  var truncTags = tags
  // var truncTags = tags.slice(0,5) || tags;
 truncTags[0] = "face"
  truncTags[1] = "old"
  truncTags[2] = "man"
  truncTags[3] = "painting"
  var adult = truncTags.indexOf("adult")
  truncTags.splice(adult, 1)
 console.log(truncTags)
  return getFlickrId(truncTags)
})
.then(getFlickrImageUrl).then(function(url){
  replaceImage(foundImage, url);
});

//get images from tags
function getFlickrId (tagArr){
    var tagString = tagArr.join('%2C+');
    var method = 'flickr.photos.search';
    var flickrUrl = 'https://api.flickr.com/services/rest/';
    var api_key = 'e7b4710e9ea3c0d71fee1d0ec25a5f37';
    var format = 'json';
    var callback = 1;
    var url = flickrUrl
    + '?method=' + method
    + '&api_key=' + api_key
    + '&tags=' + tagString
    + '&format=' + format
    + '&nojsoncallback=' + callback;
    return axios.get(url)
    .then(function(r) {
      var imgId = r.data.photos.photo[0].id;
      console.log('imgId', imgId);
      return imgId;
    }, function(err){
      console.log("There's an error: " + err);
    });

	}
function parseXml(xml) {
   var dom = null;
   if (window.DOMParser) {
      try { 
         dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
      } 
      catch (e) { dom = null; }
   }
   else if (window.ActiveXObject) {
      try {
         dom = new ActiveXObject('Microsoft.XMLDOM');
         dom.async = false;
         if (!dom.loadXML(xml)) // parse error ..

            window.alert(dom.parseError.reason + dom.parseError.srcText);
      } 
      catch (e) { dom = null; }
   }
   else
      alert("cannot parse xml string!");
   return dom;
}


function getFlickrImageUrl (photo_id) {
  var flickrUrl = 'https://api.flickr.com/services/rest/';
  var api_key = 'e7b4710e9ea3c0d71fee1d0ec25a5f37';
  var method = 'flickr.photos.getSizes';
  var format = 'json';
  var callback = 1;
  var url = flickrUrl
    + '?method=' + method
    + '&api_key=' + api_key
    + '&photo_id=' + photo_id
    + '&format=' + format
    + '&nojsoncallback=' + callback;
  return axios.get(url)
  .then(function(r) {
    console.log(r);
    var sizeArr = r.data.sizes.size;
    var imgUrl = sizeArr[Math.floor(sizeArr.length / 2)].source;
    console.log('imgUrl', imgUrl);
    return imgUrl;
  }, function(err) {
    console.log('Sorry, something is wrong: ' + err);
  });
}
