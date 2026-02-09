// data/blogPosts.ts
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "essential-supplements-for-busy-lifestyles",
    title: "Essential Supplements That Support Busy Lifestyles",
    excerpt: "It can be hard to live a healthy life in today's fast-paced environment...",
    content: `
      <h2>Introduction</h2>
      <p>In today's fast-paced world, maintaining a healthy lifestyle can be challenging. Between work commitments, family responsibilities, and social engagements, it's easy to neglect our nutritional needs.</p>
      
      <h2>Why Supplements Matter</h2>
      <p>Even with the best intentions, our modern diets often lack essential nutrients. Processed foods, soil depletion, and cooking methods can significantly reduce the nutritional value of our meals.</p>
      
      <h2>Top 5 Essential Supplements</h2>
      <p><strong>1. Multivitamins:</strong> A comprehensive multivitamin can fill nutritional gaps and ensure you're getting essential vitamins and minerals.</p>
      <p><strong>2. Omega-3 Fatty Acids:</strong> Essential for brain health, heart function, and reducing inflammation.</p>
      <p><strong>3. Vitamin D:</strong> Especially important for those who spend most of their time indoors.</p>
      <p><strong>4. Magnesium:</strong> Helps with stress management, muscle relaxation, and sleep quality.</p>
      <p><strong>5. Probiotics:</strong> Supports gut health and immune function.</p>
      
      <h2>Conclusion</h2>
      <p>While supplements shouldn't replace a balanced diet, they can provide crucial support for busy individuals. Always consult with a healthcare professional before starting any new supplement regimen.</p>
    `,
    image: "/images/whisk.png",
    author: {
      name: "Dr. Sarah Ahmed",
      avatar: "/images/whisk.png",
      bio: "Dr. Sarah Ahmed is a certified Ayurvedic practitioner with over 10 years of experience in herbal medicine and natural wellness."
    },
    category: "Health & Wellness",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["supplements", "health", "lifestyle"]
  },
  {
    id: 2,
    slug: "natural-herbal-remedies-daily-wellness",
    title: "Natural Herbal Remedies for Daily Wellness",
    excerpt: "Discover how herbal remedies can help you maintain a balanced lifestyle...",
    content: `
      <h2>The Power of Herbal Medicine</h2>
      <p>Herbal remedies have been used for centuries across cultures to promote health and wellbeing. Unlike synthetic medications, herbs work in harmony with the body's natural processes.</p>
      
      <h2>Daily Herbal Rituals</h2>
      <p><strong>Morning:</strong> Start your day with a cup of green tea for antioxidants and gentle energy.</p>
      <p><strong>Afternoon:</strong> Peppermint tea can aid digestion and provide a natural energy boost.</p>
      <p><strong>Evening:</strong> Chamomile tea promotes relaxation and better sleep.</p>
      
      <h2>Common Herbs for Daily Use</h2>
      <p><strong>Turmeric:</strong> Powerful anti-inflammatory properties.</p>
      <p><strong>Ginger:</strong> Excellent for digestion and nausea relief.</p>
      <p><strong>Ashwagandha:</strong> Adaptogenic herb for stress management.</p>
      
      <h2>Safety First</h2>
      <p>Always consult with a qualified herbalist or healthcare provider before starting any new herbal regimen, especially if you're pregnant, nursing, or taking medications.</p>
    `,
    image: "/images/whisk.png",
    author: {
      name: "Dr. Ali Khan",
      avatar: "/images/whisk.png",
      bio: "Dr. Ali Khan is a traditional herbalist with expertise in Ayurvedic and Unani medicine systems."
    },
    category: "Herbal Medicine",
    date: "2024-01-10",
    readTime: "4 min read",
    tags: ["herbs", "remedies", "ayurveda"]
  },
  {
    id: 3,
    slug: "boost-immunity-naturally",
    title: "Boost Your Immunity Naturally",
    excerpt: "Learn the best natural ways to strengthen your immune system...",
    content: `
      <h2>Understanding Immune Health</h2>
      <p>A strong immune system is your body's first line of defense against illness and infection. Natural approaches can help strengthen it without relying on medications.</p>
      
      <h2>Dietary Approaches</h2>
      <p><strong>Vitamin C-rich foods:</strong> Citrus fruits, bell peppers, broccoli.</p>
      <p><strong>Zinc sources:</strong> Pumpkin seeds, lentils, chickpeas.</p>
      <p><strong>Probiotic foods:</strong> Yogurt, kefir, fermented vegetables.</p>
      
      <h2>Lifestyle Factors</h2>
      <p><strong>Sleep:</strong> Aim for 7-9 hours of quality sleep nightly.</p>
      <p><strong>Exercise:</strong> Regular moderate exercise boosts immune function.</p>
      <p><strong>Stress management:</strong> Chronic stress weakens immunity.</p>
      
      <h2>Herbal Support</h2>
      <p><strong>Echinacea:</strong> Supports immune response.</p>
      <p><strong>Elderberry:</strong> Rich in antioxidants and vitamins.</p>
      <p><strong>Garlic:</strong> Natural antimicrobial properties.</p>
      
      <h2>Conclusion</h2>
      <p>Building a strong immune system is a holistic process involving diet, lifestyle, and natural remedies. Consistency is key to long-term benefits.</p>
    `,
    image: "/images/whisk.png",
    author: {
      name: "Dr. Fatima Zubair",
      avatar: "/images/whisk.png",
      bio: "Dr. Fatima Zubair is a nutritionist and wellness coach specializing in immune health and preventive care."
    },
    category: "Immunity",
    date: "2024-01-05",
    readTime: "6 min read",
    tags: ["immunity", "health", "natural"]
  },
  {
    id: 4,
    slug: "ayurvedic-skin-care-routine",
    title: "Ayurvedic Skin Care Routine for Glowing Skin",
    excerpt: "Discover ancient Ayurvedic secrets for radiant and healthy skin...",
    content: `
      <h2>Introduction to Ayurvedic Skin Care</h2>
      <p>Ayurveda, the ancient Indian system of medicine, offers holistic approaches to skin care based on individual body types or doshas.</p>
      
      <h2>Understanding Your Dosha</h2>
      <p><strong>Vata:</strong> Dry, thin skin that ages quickly. Needs moisturizing and nourishing treatments.</p>
      <p><strong>Pitta:</strong> Sensitive, prone to redness and inflammation. Needs cooling and soothing treatments.</p>
      <p><strong>Kapha:</strong> Oily, thick skin prone to congestion. Needs detoxifying and stimulating treatments.</p>
      
      <h2>Daily Ayurvedic Routine</h2>
      <p><strong>Morning:</strong> Oil pulling, gentle face wash with herbal powders.</p>
      <p><strong>Evening:</strong> Herbal steam, facial massage with appropriate oils.</p>
      <p><strong>Weekly:</strong> Ubtan (herbal paste) application for deep cleansing.</p>
      
      <h2>Natural Ingredients to Use</h2>
      <p><strong>Turmeric:</strong> Anti-inflammatory and brightening.</p>
      <p><strong>Sandalwood:</strong> Cooling and soothing for irritated skin.</p>
      <p><strong>Neem:</strong> Antibacterial for acne-prone skin.</p>
      <p><strong>Rose Water:</strong> Natural toner for all skin types.</p>
      
      <h2>Conclusion</h2>
      <p>Ayurvedic skin care focuses on balancing the body from within. Consistent practice with natural ingredients can lead to lasting skin health.</p>
    `,
    image: "/images/whisk.png",
    author: {
      name: "Dr. Priya Sharma",
      avatar: "/images/whisk.png",
      bio: "Dr. Priya Sharma is an Ayurvedic dermatologist with 15 years of experience in traditional skin care treatments."
    },
    category: "Skin Care",
    date: "2024-01-20",
    readTime: "7 min read",
    tags: ["ayurveda", "skincare", "natural"]
  },
  {
    id: 5,
    slug: "stress-management-through-yoga",
    title: "Stress Management Through Yoga and Meditation",
    excerpt: "Learn how yoga and meditation can help reduce stress and improve mental health...",
    content: `
      <h2>The Modern Stress Epidemic</h2>
      <p>In our fast-paced world, chronic stress has become a common health issue affecting both physical and mental wellbeing.</p>
      
      <h2>Yoga for Stress Relief</h2>
      <p><strong>Gentle Asanas:</strong> Child's pose, forward bends, and restorative poses calm the nervous system.</p>
      <p><strong>Pranayama:</strong> Breathing techniques like Nadi Shodhana (alternate nostril breathing) balance energy.</p>
      <p><strong>Yoga Nidra:</strong> Guided relaxation for deep rest and stress release.</p>
      
      <h2>Meditation Techniques</h2>
      <p><strong>Mindfulness:</strong> Being present in the moment without judgment.</p>
      <p><strong>Loving-Kindness:</strong> Cultivating compassion for self and others.</p>
      <p><strong>Transcendental:</strong> Using mantras to reach deeper states of consciousness.</p>
      
      <h2>Creating a Daily Practice</h2>
      <p>Start with just 10 minutes daily, gradually increasing as you become comfortable. Consistency is more important than duration.</p>
      
      <h2>Scientific Benefits</h2>
      <p>Research shows regular yoga and meditation reduce cortisol levels, lower blood pressure, improve sleep quality, and enhance overall wellbeing.</p>
      
      <h2>Conclusion</h2>
      <p>Incorporating yoga and meditation into your daily routine can transform your relationship with stress and lead to greater peace and balance.</p>
    `,
    image: "/images/whisk.png",
    author: {
      name: "Yogi Raj Patel",
      avatar: "/images/whisk.png",
      bio: "Yogi Raj Patel is a certified yoga therapist and meditation teacher with over 20 years of experience in stress management."
    },
    category: "Mental Health",
    date: "2024-01-25",
    readTime: "8 min read",
    tags: ["yoga", "meditation", "stress", "mental-health"]
  }
];