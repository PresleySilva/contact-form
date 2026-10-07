const { neon } = require("@neondatabase/serverless");

module.exports = async (req, res) => {

    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    // Get form data
    const {
        name,
        email,
        message
    } = req.body || {};


    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }


    try {

        // Connect to Neon using DATABASE_URL
        const sql = neon(
            process.env.DATABASE_URL
        );


        // Insert data into contacts table
        await sql`
            INSERT INTO contacts
            (name, email, message)
            VALUES
            (${name}, ${email}, ${message})
        `;


        // Send success response
        return res.status(200).json({
            ok: true,
            message: "Message saved successfully"
        });


    } catch (error) {

        console.error(
            "Database error:",
            error
        );

        return res.status(500).json({
            error: "Database error"
        });

    }
};