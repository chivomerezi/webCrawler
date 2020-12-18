const request =  require('request');
const cheerio = require('cheerio');

    request('https://es.wikipedia.org/wiki/Wikipedia:Portada', (error, response, html) => {

        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html)

            console.log("\n ------------------- TITULO DE LA PAGINA ------------------------- \n")

                //  SACA EL TITULO
                var titulo = $("title").text();
                console.log(titulo);

            console.log("\n ------------------- PARRAFOS DE LA PAGINA ------------------------- \n")

                //  SACA EL TEXTO
                parrafos = $('p'); 
                $(parrafos).each( function(i, parrafo){

                    console.log($(parrafo).text() + '\n');

                    }

                );

            console.log("\n ------------------- TEXTO HIPERVINCULOS ------------------------- \n")


                //  SACA TODOS LOS TEXTOS DE LOS LINKS
                links = $('a'); 
                $(links).each( function(i, link){

                    console.log($(link).text() + '\n');

                    }

                );

            console.log("\n ------------------- HIPERVINCULOS ------------------------- \n")
            
                //  SACA TODOS LOS LINKS
                links = $('a'); 
                $(links).each( function(i, link){

                    console.log($(link).text() + '\n  ' + $(link).attr('href'));

                    }

                );

                console.log("\n ------------------- ACCESIBILIDAD ------------------------- \n")

                //  SACA INFORMACION DE ACCESIBILIDAD
                mltmedia = $('img'); //jquery get all hyperlinks
                $(mltmedia).each( function(i, elemento){

                    console.log($(elemento).attr('alt'));

                    }

                );

        }

    });