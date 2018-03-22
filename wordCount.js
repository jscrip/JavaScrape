//retrieves word counts for all text in the body of the page
var words = document.body.textContent.split(/\s+/).sort().filter( function(v,i,o){return v!==o[i-1] && v.length > 2 && !v.match(/[^a-z]/i);}).map(function(word){return {word:word, count:document.body.textContent.split(word).length}}).sort(function(a, b) {
    return parseFloat(a.count) - parseFloat(b.count);
});
console.log(words);
