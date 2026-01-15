const User = require('../models/User');

exports.getUserData = async (req, res) => {
  try {
    const { clerkId } = req.params;
    
    if (!clerkId) {
      return res.status(400).json({ message: "Clerk ID is required" });
    }

    // Try to find the user
    let user = await User.findOne({ clerkId });
    
    // AUTO-REGISTRATION: If user doesn't exist in MongoDB, create them now
    if (!user) {
      user = new User({ 
        clerkId, 
        email: "student@planova.com", // Placeholder: Clerk info can be passed from frontend if needed
        streak: 0,
        lastStreakUpdate: null
      });
      await user.save();
      console.log(`New user registered: ${clerkId}`);
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("User Fetch Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};