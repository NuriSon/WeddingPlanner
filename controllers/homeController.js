var venues = [
    {
      title: "Venue1",
      cost: 500
    },
    {
      title: "Venue2",
      cost: 300
    },
    {
      title: "Venue3",
      cost: 800
    }
  ];

  var vendors = [
    {
      title: "Vendor1",
      cost: 50
    },
    {
      title: "Vendor2",
      cost: 120
    },
    {
      title: "Vendor3",
      cost: 200
    }
  ];

exports.showVenues = (req, res) => {
    res.render("venues", {
      offeredVenues: venues
    });
  };

  exports.showVendors = (req, res) => {
    res.render("vendors", {
      offeredVendors: vendors
    });
  };
  
  exports.showSignUp = (req, res) => {
    res.render("contact");
  };
  
  exports.postedSignUpForm = (req, res) => {
    res.render("thanks");
  };