const siteContent = {
  name: "Sergey's Designs",
  tagline: "Custom websites for restaurants that actually bring in customers.",
  subtitle: "Beautiful, fast, mobile-friendly sites with online ordering so your customers find you before they find your competitor.",
  location: "Roseville, CA",
  email: "sergeysdesigns@gmail.com",        // ✏️ Replace
  phone: "(916) 832-0195",        // ✏️ Replace

  projects: [
    {
      name: "Saigon Kitchen",
      type: "Vietnamese Restaurant",
      description: "Full website with food photography, interactive menu, online ordering integration, and SEO setup.",
      url: "https://saigon-kitchen-demo.sergeysdesigns.workers.dev",  // ✏️ Replace with actual URL
      image: "https://as2.ftcdn.net/jpg/04/39/56/23/1000_F_439562347_8UsuF9ByzTbCBabsrUCahbVzqm9GPHDN.jpg",
    },
	{
      name: "Taqueria Los Lagos",
      type: "Mexican Restaurant",
      description: "Adobe-inspired design with full menu from their board, catering section, and DoorDash integration.",
      url: "https://taqueria-los-lagos.sergeysdesigns.workers.dev",
      image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800&q=80",
    },
	{
	  name: "Golden Crust Bakery",
	  type: "Artisan Bakery & Cafe",
	  description: "Split-layout bakery site with horizontal product carousel, menu cards, and DoorDash ordering integration.",
	  url: "https://golden-crust-bakery.sergeysdesigns.workers.dev",
	  image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800",
	},
  ],

  setupPrice: "500",
  monthlyPrice: "50",

  setupFeatures: [
    "Custom design tailored to your brand",
    "Mobile-responsive on all devices",
    "Menu, hours, location & contact pages",
    "Food photography integration",
    "Domain setup & Google SEO basics",
    "30 days of free updates after launch",
  ],

  maintenanceFeatures: [
    "Hosting & domain renewal included",
    "Menu & photo updates (up to 4/mo)",
    "Holiday hours & seasonal changes",
    "Uptime monitoring & security",
    "Priority response within 24 hours",
  ],

  integrations: [
    { name: "DoorDash", color: "#FF3008" },
    { name: "Uber Eats", color: "#06C167" },
    { name: "Grubhub", color: "#F63440" },
    { name: "Toast", color: "#FF4C00" },
    { name: "Square", color: "#006AFF" },
    { name: "Yelp", color: "#D32323" },
    { name: "Google Business", color: "#4285F4" },
    { name: "OpenTable", color: "#DA3743" },
  ],
};

export default siteContent;
