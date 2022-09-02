import express, { Router, Request, Response } from 'express' ;
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { URL } from 'url';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
//jolie
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  //End point de filtrage de l'image
 app.get("/filteredimage", async( req, res ) => {

  //On définit une variable qui va contenir l'url de l'image à filtrer
  let { image_url } = req.query;
//si l'utilisateur n'inscrit pas une url on revoit le code 400 avec le message y afférent
  if ( !image_url ) {
    return res.status(400)
              .send(`URL obligatoire!!!`);
  }


 //si l'utilisateur une url mal formée, on revoit le code 400 avec le message y afférent
  if ( image_url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) !=null ) {
    return res.status(400)
              .send(`Inscrivez une URL valide`);
  }
//
// les 2 instructions suivantes s'exécutent ssi le l'url inscrite est valide c'est à dire le paramètre image_url est non vide et bien formé
//
  const filteredImage = filterImageFromURL(image_url);
  
  res.status(200).sendFile(await filteredImage);
//}
});




  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();