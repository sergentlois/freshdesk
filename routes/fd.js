const express = require("express");
const Freshdesk = require("freshdesk-api");
const freshdesk = new Freshdesk(
  "https://krrsbc.freshdesk.com",
  "QGwgYt5UwzwPrAZ7zVeC"
);
const Promise = require("bluebird");
var asyncFreshdesk = Promise.promisifyAll(
	new Freshdesk("https://krrsbc.freshdesk.com", "QGwgYt5UwzwPrAZ7zVeC")
);


const ticketRouter = express.Router();

ticketRouter.get('/countopentix', (req,res) =>{
    console.log(req.query)
    //param sample requester_id=48004281278&include=stats&order_by=status&order_type=desc

    freshdesk.listAllTickets(req.query, function(err, data, extra) {
        if (err){
            res.status(403).json({error : err})
        }
        var countOpenTix = 0;

        for(let key of Object.values(data)){
            console.log(key.status);
            if (key.status == 10){
                countOpenTix +=1
            }
            res.status(200).json({"Open": countOpenTix});
        }
    });
});

ticketRouter.get('/getid',(req,res) =>{
    console.log(req.query)
    freshdesk.listAllContacts(req.query, function(err, data, extra) {
        if (err){
            res.status(403).json({error : err})
        }

        for(let key of Object.values(data)){
            console.log(key.id)
            res.status(200).json({ID: key.id});
        }
        
        
      });

});




ticketRouter.get('/view', (req,res) =>{
    console.log(req.query)
    freshdesk.listAllTickets(req.query, function(err, data, extra) {
        if (err){
            res.status(403).json({error : err})
        }
        
  
            console.log('Count of Tickets')
            console.log(Object.values(data).length);
            //console.log('List of Tickets')
            var countOpenTix = 0;

            for(let key of Object.values(data)){
                
                console.log(key.status);
                if (key.status == 10){
                    countOpenTix +=1
                }
                //console.log(key.subject);
                //console.log(key.type);
                //console.log(key.status);
            }

            console.log('Count of Open Tickets')
            console.log(countOpenTix);
          

            res.status(200).json({data: data});
        
      });
});


ticketRouter.get('/allcontact', (req,res) => {
    asyncFreshdesk.getTicketAsync(21)
    .then((data, extra) => {
        console.log(data, extra)
    })

    .catch(Freshdesk.FreshdeskError, err => {
        // typed `catch` exists only in bluebird

        console.log('ERROR OCCURED', err)
    })

})

ticketRouter.get('/contact', (req, res) => {

    console.log(req.query)
    freshdesk.listAllContacts(req.query, function(err, data, extra) {
        if (err){
            res.status(403).json({error : err})
        }

        

        for(let key of Object.values(data)){
            console.log(key.email);
        }
        
        /* 
        var keys = [];
        for(var i = 0; i< data.length;i++)
        {
            Object.keys(data[i]).forEach(function(key){
                if(keys.indexOf(key) == -1)
                {
                    keys.push(key);
                }
            });
        }
            console.log(keys); */
        res.status(200).json({data: data});
      });
})


module.exports = ticketRouter;