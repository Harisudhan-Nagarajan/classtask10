app.get("/movies", async(reqest, respone) => {
  let moviedb=  await clint.db("order").collection("movies").find({}).toArray()
  const {language,rating} = reqest.query;

  if(language && rating){
    moviedb=  await clint.db("order").collection("movies").find({language:language,rating:+rating}).toArray()
  }else if(language){
    moviedb=  await clint.db("order").collection("movies").find({language:language}).toArray()
  }else if(rating){ 
    moviedb=  await clint.db("order").collection("movies").find({rating:+rating}).toArray()
  }
  moviedb?respone.send(moviedb):respone.status(404).send({message:"Not Found"})
  

});

app.get("/movies/:id", async (reqest, respone) => {
  const{id}=reqest.params;
  // const movieid = movies.find((movie) => movie.id === reqest.params.id);
  const movieid = await clint.db("order").collection("movies").findOne({ id: id })
  movieid?respone.send(movieid):respone.status(404).send({message:"Not Found"})
});
