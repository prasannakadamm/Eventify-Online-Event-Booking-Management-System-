const Review = require('./controllers/reviewController');
const Notification = require('./controllers/notificationController');
const Payment = require('./controllers/paymentController');
const Category = require('./controllers/categoryController');
const Venue = require('./controllers/venueController');

async function verifyImports() {
    console.log('--- Verifying Component Imports ---');

    const components = {
        Review,
        Notification,
        Payment,
        Category,
        Venue
    };

    for (const [name, component] of Object.entries(components)) {
        if (component) {
            console.log(`${name} controller/routes imported successfully.`);
        } else {
            console.error(`Error: ${name} component failed to import.`);
            process.exit(1);
        }
    }

    console.log('--- All components verified successfully ---');
}

verifyImports();
