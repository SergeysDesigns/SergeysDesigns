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
	{
	  name: "Ember & Bloom",
	  type: "Craft Coffee & Bakery",
	  description: "Split-hero coffee shop site with featured drinks carousel, tabbed menu, and warm copper-and-sage design.",
	  url: "https://ember-and-bloom.sergeysdesigns.workers.dev",
	  image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
	},
	{
	  name: "Roseville Slice Co.",
	  type: "Wood-Fired Pizza",
	  description: "Full-viewport hero pizza site with signature pies grid, multi-tier pricing menu, and catering section.",
	  url: "https://roseville-slice-co.sergeysdesigns.workers.dev",
	  image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
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

  testimonials: [
    {
      name: "Maria Nguyen",
      role: "Owner, Saigon Kitchen",
      text: "Sergey took our outdated Yelp presence and turned it into a real website that customers actually find. We've seen a noticeable bump in online orders since launch.",
    },
    {
      name: "Carlos Ramirez",
      role: "Owner, Taqueria Los Lagos",
      text: "He understood exactly what we needed. The DoorDash integration alone has paid for the site ten times over. Highly recommend.",
    },
    {
      name: "Elena Petrov",
      role: "Owner, Golden Crust Bakery",
      text: "Professional, fast, and actually listens. Our site looks like it belongs to a much bigger operation. Customers tell us all the time how great it looks.",
    },
    {
      name: "Rachel Kim",
      role: "Owner, Ember & Bloom",
      text: "We went from Instagram-only to a real website with our full menu and ordering. The design perfectly captures our brand — warm, inviting, modern. Exactly what we wanted.",
    },
    {
      name: "Tony Rossi",
      role: "Owner, Roseville Slice Co.",
      text: "Sergey built us something that actually looks like a real pizzeria brand, not a template. The menu with slice and whole pie pricing was a great touch. Customers love it.",
    },
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
