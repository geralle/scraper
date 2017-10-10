const request = require('request')
const Promist = require('promise')
const parseString = require('xml2js').parseString;

var url = "https://store.obeygiant.com/sitemap_products_1.xml"
var userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"

function getProductLinks(){
  var productLinks = []
  return new Promise(function(resolve, reject){
    request({
      url: url,
      method: 'get',
      headers: {
        'User-Agent': userAgent,
      }
    },function(err, res, body){
      parseString(body, function(err, result) {
        if(err){
          console.log(err)
        }
        for(var i=0;i<result.urlset.url.length;i++){
          productLinks.push(result.urlset.url[i].loc[0])
        }
      })
      return productLinks
    })
  })
}

getProductLinks().then(function(data){
  console.log(data)
}).catch(function(err) {
  console.err(err);
});
