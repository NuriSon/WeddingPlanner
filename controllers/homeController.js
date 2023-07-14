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

module.exports = {
  showBudgetTracker: (req, res) => {
    res.render("budget");
  },
  chat: (req, res) => {
    res.render("chat");
  },
  showVenues: (req, res) => {
    res.render("venues", {
      offeredVenues: venues
    });
  },
};