let sectionItems = {...document.querySelectorAll('section')};
 
let options = {
  rootMargin: '-10%',
  threshold: 0.0
}
  let observer = new IntersectionObserver(showItem, options);
function showItem (entries){
  entries.forEach( entry => {
    if(entry.Intersecting) {
      entry.target.children[0].classlist.add('active')
    }
  }) 
}
  sectionItems.forEach(item =>{



  }); 