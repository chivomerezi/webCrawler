const cheerio = require('cheerio');
const requestPromise = require('request-promise-native')
const fs = require('fs');

const listaSitios= ['http://www.canal12.com.sv/noticias/deportes-3',
'https://www.canal12.com.sv/deportes/guardiola-confiesa-que-el-real-madrid-le-ha-ayudado-a-ser-mejor-entrenador-91618',
'https://www.canal12.com.sv/actualidad/compro-un-porsche-con-cheque-de-140000-dolares-que-imprimio-en-su-casa-91617',
'http://www.canal12.com.sv/noticias/actualidad-1',
'https://www.canal12.com.sv/actualidad/compro-un-porsche-con-cheque-de-140000-dolares-que-imprimio-en-su-casa-91617',
'https://www.canal12.com.sv/actualidad/sobrevive-al-covid-19-y-convierte-su-oficina-en-un-hospital-para-los-mas-necesitados-de-la-ciudad-91616',
'http://www.canal12.com.sv/noticias/actualidad-1',
'https://www.canal12.com.sv/actualidad/sobrevive-al-covid-19-y-convierte-su-oficina-en-un-hospital-para-los-mas-necesitados-de-la-ciudad-91616',
'https://www.canal12.com.sv/actualidad/hermanas-arriesgan-hasta-20-anos-de-carcel-por-matar-a-su-padre--abuso-de-ellas-durante-anos-91615',
'http://www.canal12.com.sv/noticias/actualidad-1',
'https://www.canal12.com.sv/actualidad/hermanas-arriesgan-hasta-20-anos-de-carcel-por-matar-a-su-padre--abuso-de-ellas-durante-anos-91615',
'https://www.canal12.com.sv/espectaculos/descubren-a-un-nino-escabullendose-de-su-cama-para-dormir-acurrucado-junto-a-su-perro-91614',
'http://www.canal12.com.sv/noticias/espectaculos-2',
'https://www.canal12.com.sv/espectaculos/descubren-a-un-nino-escabullendose-de-su-cama-para-dormir-acurrucado-junto-a-su-perro-91614',
'https://www.canal12.com.sv/programacion',
'https://www.canal12.com.sv/noticias/actualidad-1',
'https://www.canal12.com.sv/noticias/deportes-3',
'https://www.canal12.com.sv/noticias/espectaculos-2',
'https://www.canal12.com.sv/noticias/tendencias-17567',
'https://www.canal12.com.sv/programas',
'https://www.canal12.com.sv/envivo']

const listTags = ['title', 'a', 'p', 'img','h1', 'h2', 'h3', 'h4', 'h5', 'h6']

async function crawler(pagina, tag){
    return new Promise(async function(resolve, reject) {

        const $ = await requestPromise(pagina, {

            transform: body => cheerio.load(body),
        });
        
        const header = $(tag);
        $(header).each( function(i, head){

            try {
                    if (tag === 'a'){

                        if(($(head).attr("href").charAt(0) === 'h' || $(head).attr("href").charAt(0) === '/')){
                            if($(head).attr("href").charAt(0) === 'h'  && pagina + '/' !== $(head).attr("href")  ){
                                fs.appendFileSync('links.txt', $(head).attr("href") + "\n" ,{ mode: 0o755 });

                            } else {
                                
                                if($(head).attr("href").length > 1 && $(head).attr("href").charAt(0) === '/'){
                                    fs.appendFileSync('links.txt', pagina + $(head).attr("href") + "\n" ,{ mode: 0o755 });
                                
                                }

                            }

                        } 

                    } 

                    if (tag === 'p' || tag === 'title' || tag === 'h1'|| tag === 'h2'|| tag === 'h3'|| tag === 'h4'|| tag === 'h5'|| tag === 'h6'){
                        var dividido = $(head).text().split(" ") 

                            for(var palabra =0; palabra < dividido.length; palabra++){
                                var word = dividido[palabra].trim().replace(/[&\/\\#,+()$~%.'":¿!¡*?<>{}]/g, '')

                                if(word !== ''){
                                    fs.appendFileSync('dataSet.txt', pagina + '|'
                                    + tag + '|'
                                    + word
                                    +'\n' ,{ mode: 0o755 });

                                }
                            }

                    } else {
                        
                        if($(head).attr("alt") !== undefined && $(head).attr("alt") !== '' && $(head).attr("alt") !== ' '){                             
                            var dividido = $(head).attr("alt").split(" ") 

                                for(var palabra =0; palabra < dividido.length; palabra++){
                                    var word = dividido[palabra].trim().replace(/[&\/\\#,+()$~%.'":¿!¡*?<>{}]/g, '')

                                    if(word !== ''){
                                        fs.appendFileSync('dataSet.txt', pagina + '|'
                                        + 'alt' + '|'
                                        + word
                                        +'\n' ,{ mode: 0o755 });

                                    }        
                                }                 
                        }

                    }

            } catch(reject) {
                // An error occurred
                console.error(reject);
            }

        })  
   
        resolve(header)
    })
};

async function app(lPagina, lTags){
    return new Promise(async function(resolve, reject) {
        
        lPagina.forEach(async (pagina)=> {
            
            lTags.forEach(async (tag)=> {
                await crawler(pagina, tag).then(function(result) {

                    
                })
                              
            })
        })

        resolve(1)
    })
}

var gg = app(listaSitios, listTags).then(function(result) {
    console.log(result) 
 });