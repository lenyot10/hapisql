

const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const server =new Hapi.Server({
    host: 'localhost',
    port: 3101,
})

server.route([{
    method:'GET',
    path :'/',
    handler :(request, h) => {
        return 'helloss';
    }
},
{
    method:'GET',
    path :'/hello',
    handler :(request, h) => {
        return 'I am root route';
}
}
,{
    method : 'POST',
    path : '/persegi',
    config : {
        validate : {
            payload :{
            panjang : Joi.number().min(1).required(),
            lebar : Joi.number().min(1).required()
            
            }
            
        }
    },
    handler : (request, h) => {
        console.log(request.payload);//cek parameter inputan form
            let panjangRequest = request.payload.panjang;//konversi string ke number
            let lebarRequest = request.payload.lebar;
            let hasil = parseInt(panjangRequest ) * parseInt(lebarRequest) //bikib variabel menampung nilai luas
            const data = {data : 'hello detail users',...request.payload, hasil:hasil}//membentuk respom berbentuk json
        return h.response(data).code(200)//retrun out pun berupa json
        
    }
},{
    method : 'POST',
    path : '/GenapGanjil',
    config : {
        validate : {
            payload :{
            GenapGanjil : Joi.number().min(1).required(),
           
            }
        }
    },
    handler : (request, h) => {
        console.log(request.payload);
            let GenapGanjilRequest =  request.payload.GenapGanjil;
            let hasil = "koso";
            console.log(GenapGanjilRequest)
            if (GenapGanjilRequest % 2 === 1) {
               
                  hasil ="ganjil";
                 
            } else { 
                
                 hasil = "genap";
            }
           
         data = {data : 'Menentukan Ganjil Genapdsdsd',...request.payload,hasil : hasil}
        return h.response(data).code(200)
          
    }
    }
])

const main = async () =>{
    //register the plugin
    await server.register(require('./src/routes/user'));
    await server.start();
    return server;
}

main().then(server => {
    console.log('server running at:', server.info.uri)
    }).catch(err =>{
        console.log(err)
        process.exit(1)
    })