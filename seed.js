const mongoose = require("mongoose");
const Contact = require("./models/contact");

// Asynchronous function to seed the data
const seedData = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/wedding_db", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to database.");

        const contacts = [
            {
                name: "Jon Wexler",
                email: "jon@jonwexler.com"
            },
            {
                name: "Chef Eggplant",
                email: "eggplant@recipeapp.com"
            },
            {
                name: "Professor Souffle",
                email: "souffle@recipeapp.com"
            }
        ];

        // Delete existing contacts
        await Contact.deleteMany();
        console.log("Contact data is empty!");

        // Create new contacts
        const createPromises = contacts.map(contact => Contact.create(contact));
        const result = await Promise.all(createPromises);

        console.log("Created new contacts:");
        console.log(JSON.stringify(result));
    } catch (error) {
        console.log(`ERROR: ${error}`);
    } finally {
        // Close connection, whether there was an error or not
        mongoose.connection.close();
    }
};

// Execute the function
seedData();
