exports.sendReqVendors = (req, res) => {
    let vend = req.params.url;
    res.send(`This is the page for ${vend}`);
};

exports.sendIndex = (req, res) => {
    res.send("We are here to make your dreams come true");
}

exports.showData = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
};