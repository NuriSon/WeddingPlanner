exports.sendReqParam = (req, res) => {
    let weddingplan = req.params.url;
    res.send(`This is the page for ${weddingplan}`);
   };
   exports.showData = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
   };