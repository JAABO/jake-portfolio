const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51MFXToL4FK38puHVjaE9fqsdyomkYOovXrIbkKkJ3pLezts65yvCYFkS2Hb1Xz8xLLtVvBrnOFMkcHtlzdDomIoo00pD8JErxU');

var https = require('https');
  
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:8000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
 var responseStripe = "";
app.post('/create-payment-intent', async (req, res) => {
 

 
  var options = {
    host: 'api.stripe.com',
    path: '/v1/payment_intents',
    headers:{
              Authorization: ' Bearer sk_test_51MFXToL4FK38puHVjaE9fqsdyomkYOovXrIbkKkJ3pLezts65yvCYFkS2Hb1Xz8xLLtVvBrnOFMkcHtlzdDomIoo00pD8JErxU'            
        }

  };

  var req = https.get(options, function(resp) {
    
    console.log('STATUS: ' + resp.statusCode);
    console.log('HEADERS: ' + JSON.stringify(resp.headers)); 
    

    resp.on('data', function(chunk){
        //console.log("INFO: "+chunk);
      responseStripe+= chunk;
      console.log(responseStripe)
      
      
    });
   
    // This never happens
    resp.on('end', function () {
      res.write(responseStripe);
      res.end();
        console.log("End received!");
    });
    
  });

 

});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
