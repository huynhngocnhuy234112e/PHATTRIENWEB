import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Tag, Play, Heart, MessageCircle, Share2, Clock, ArrowLeft, Facebook, Twitter, LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogPageProps {
  onPageChange: (page: string) => void;
}

export function BlogPage({ onPageChange }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);

  const categories = ['All', 'Health & Wellness', 'Recipes', 'News & Events', 'Sustainability', 'Behind the Scenes'];

  const articles = [
    {
      id: 1,
      title: 'The Health Benefits of Matcha: Ancient Wisdom Meets Modern Science',
      excerpt: 'Discover why matcha has been cherished for centuries and how modern research confirms its incredible health benefits.',
      author: 'Dr. Sarah Chen',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Health & Wellness',
      image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      featured: true,
      likes: 245,
      comments: 18,
      fullContent: `
        <p>Matcha, the vibrant green powder that has taken the wellness world by storm, is far more than just a trendy ingredient. This ancient Japanese superfood has been revered for over 900 years, and modern science is finally catching up to what Buddhist monks have known all along.</p>
        
        <h2>The Science Behind the Green</h2>
        <p>What makes matcha so special? Unlike regular green tea where you steep and discard the leaves, with matcha you consume the entire leaf in powdered form. This means you're getting a concentrated dose of all the beneficial compounds.</p>
        
        <p>Research shows that matcha contains 137 times more antioxidants than regular green tea. These antioxidants, particularly catechins like EGCG (epigallocatechin gallate), are powerful compounds that help protect your cells from oxidative stress and inflammation.</p>
        
        <h2>Mental Clarity and Calm Energy</h2>
        <p>One of the most remarkable aspects of matcha is its unique combination of caffeine and L-theanine. While caffeine provides energy and alertness, L-theanine promotes relaxation and focus. This combination creates what Japanese tea masters call "calm alertness" - a state of focused energy without the jitters or crash associated with coffee.</p>
        
        <h2>Heart Health Benefits</h2>
        <p>Studies have shown that regular consumption of green tea catechins can help reduce LDL (bad) cholesterol levels and support cardiovascular health. The antioxidants in matcha may also help reduce the risk of heart disease and stroke.</p>
        
        <h2>How to Choose Quality Matcha</h2>
        <p>Not all matcha is created equal. Look for ceremonial-grade matcha that's vibrant green in color, has a smooth texture, and comes from Japan. At AloTra, we source our matcha directly from Uji, Japan, ensuring you get the highest quality powder with maximum health benefits.</p>
        
        <p>Ready to experience the benefits of matcha? Try our Matcha Supreme - a perfect blend of premium ceremonial matcha with creamy oat milk that makes healthy living delicious.</p>
      `,
      tags: ['Matcha', 'Health Benefits', 'Antioxidants', 'Wellness']
    },
    {
      id: 2,
      title: 'DIY Brown Sugar Milk Tea Recipe: Master the Art at Home',
      excerpt: 'Learn to create the perfect brown sugar milk tea with our step-by-step video guide and professional tips.',
      author: 'Chef Marcus Wong',
      date: '2024-01-12',
      readTime: '8 min read',
      category: 'Recipes',
      image: 'https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      featured: false,
      likes: 189,
      comments: 32,
      hasVideo: true,
      fullContent: `
        <p>Brown sugar milk tea has become a global phenomenon, and for good reason. The rich, caramelized sweetness combined with creamy milk and chewy pearls creates an irresistible treat. Today, I'll share the secrets to making café-quality brown sugar milk tea at home.</p>
        
        <h2>Ingredients You'll Need</h2>
        <ul>
          <li>1 cup brown sugar</li>
          <li>1/4 cup water</li>
          <li>1 cup whole milk</li>
          <li>1/2 cup cooked tapioca pearls</li>
          <li>Ice cubes</li>
          <li>Optional: black tea base</li>
        </ul>
        
        <h2>Step 1: Creating the Perfect Brown Sugar Syrup</h2>
        <p>The key to exceptional brown sugar milk tea lies in the syrup. Heat the brown sugar and water in a heavy-bottomed pan over medium heat. Stir gently until the sugar dissolves, then let it bubble and caramelize. You'll know it's ready when it reaches a deep amber color and coats the back of a spoon.</p>
        
        <h2>Step 2: Preparing Your Pearls</h2>
        <p>If using store-bought tapioca pearls, cook them according to package instructions. For the best texture, they should be chewy but not hard in the center. Once cooked, rinse with cold water and toss with a little brown sugar syrup to prevent sticking.</p>
        
        <h2>Step 3: Assembly Magic</h2>
        <p>Here's where the visual drama happens. Drizzle your brown sugar syrup along the inside walls of your glass, creating those Instagram-worthy streaks. Add your cooked pearls, fill with ice, and slowly pour in the cold milk. The contrast between the dark syrup and white milk creates the signature "tiger stripes" effect.</p>
        
        <h2>Pro Tips from the Kitchen</h2>
        <p>• Use whole milk for the creamiest texture</p>
        <p>• Don't stir immediately - let your guests enjoy the visual appeal first</p>
        <p>• Add a shot of strong black tea for extra depth</p>
        <p>• Serve with a wide straw to enjoy the pearls</p>
        
        <p>Practice makes perfect, and soon you'll be creating brown sugar milk tea that rivals your favorite café. Visit AloTra to try our signature Brown Sugar Delight and taste the difference that premium ingredients make!</p>
      `,
      tags: ['Recipe', 'Brown Sugar', 'Milk Tea', 'DIY', 'Tutorial']
    },
    {
      id: 3,
      title: 'AloTra Goes Carbon Negative: Our 2024 Sustainability Milestone',
      excerpt: 'Announcing our achievement of carbon negative operations and our roadmap for an even greener future.',
      author: 'Emily Rodriguez',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1611653682092-d881246b72a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU3ODE3OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      featured: true,
      likes: 156,
      comments: 24,
      fullContent: `
        <p>We're thrilled to announce that AloTra has achieved carbon negative operations across all our locations! This milestone represents not just an environmental victory, but a commitment to the planet that goes beyond neutrality to actively removing carbon from the atmosphere.</p>
        
        <h2>What Does Carbon Negative Mean?</h2>
        <p>While carbon neutral means balancing emissions with reductions, carbon negative means we remove more carbon from the atmosphere than we produce. Through a combination of renewable energy, sustainable sourcing, and reforestation projects, we've turned our business into a force for environmental healing.</p>
        
        <h2>Our Journey to Carbon Negative</h2>
        <p>This achievement didn't happen overnight. Here's how we did it:</p>
        
        <h3>100% Renewable Energy</h3>
        <p>All AloTra locations now run on renewable energy sources, including solar panels on our rooftops and wind energy contracts.</p>
        
        <h3>Sustainable Sourcing</h3>
        <p>We've partnered with tea gardens and suppliers who use regenerative agriculture practices that actually capture carbon in the soil.</p>
        
        <h3>Zero Waste Operations</h3>
        <p>Our closed-loop system ensures that 95% of our waste is diverted from landfills through composting and recycling programs.</p>
        
        <h3>Reforestation Partnerships</h3>
        <p>For every drink sold, we plant a tree through our partnerships with reforestation organizations in tea-growing regions.</p>
        
        <h2>The Road Ahead</h2>
        <p>Becoming carbon negative is just the beginning. Our 2024-2025 roadmap includes:</p>
        <ul>
          <li>Expanding our reforestation program to plant 1 million trees</li>
          <li>Developing biodegradable packaging solutions</li>
          <li>Supporting our supply chain partners in their sustainability journeys</li>
          <li>Launching our Carbon Impact App so customers can track their positive environmental impact</li>
        </ul>
        
        <p>Every cup you enjoy at AloTra now represents a positive action for our planet. Together, we're proving that business can be a force for environmental restoration. Thank you for being part of this journey!</p>
      `,
      tags: ['Sustainability', 'Carbon Negative', 'Environment', 'Green Business']
    },
    {
      id: 4,
      title: 'Meet Our Tea Masters: Behind the Scenes of Flavor Creation',
      excerpt: 'Get to know the passionate artisans who craft our unique blends and create new flavor experiences.',
      author: 'Team AloTra',
      date: '2024-01-08',
      readTime: '7 min read',
      category: 'Behind the Scenes',
      image: 'https://images.unsplash.com/photo-1542338303-5c626b183494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMGRyaW5raW5nJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      featured: false,
      likes: 203,
      comments: 15,
      hasVideo: true,
      fullContent: `
        <p>Behind every exceptional cup at AloTra is a team of dedicated tea masters who bring decades of experience and boundless creativity to flavor development. Today, we're pulling back the curtain to introduce you to the artisans who make the magic happen.</p>
        
        <h2>Master Chen Wei: The Traditionalist</h2>
        <p>With 30 years of experience in traditional Chinese tea preparation, Master Chen brings authenticity and depth to our classic offerings. "Tea is not just a beverage," he explains, "it's a bridge between generations, cultures, and moments in time."</p>
        
        <p>Chen's approach to tea blending is methodical and respectful of tradition. He begins each day at 5 AM, tasting and evaluating tea samples from our partner gardens across Asia. His palate can detect subtle differences in terroir, processing methods, and seasonal variations that the average person would never notice.</p>
        
        <h2>Isabella Kim: The Innovator</h2>
        <p>While Chen preserves tradition, Isabella Kim pushes boundaries. Our head of flavor innovation has a background in molecular gastronomy and brings scientific precision to creative experimentation. Her laboratory looks more like a modern chemistry lab than a traditional tea room.</p>
        
        <p>"I love taking traditional flavors and finding new ways to express them," Isabella shares. "Our Tropical Passion blend came from my experiments with fruit pearls that burst with flavor. We spent six months perfecting the technique to encapsulate real fruit juices in edible spheres."</p>
        
        <h2>The Collaborative Process</h2>
        <p>Creating a new AloTra blend is a collaborative process that can take anywhere from three months to over a year. Here's how it typically works:</p>
        
        <h3>1. Inspiration Phase</h3>
        <p>Ideas come from everywhere - seasonal ingredients, customer feedback, cultural celebrations, or simply a master's creative vision.</p>
        
        <h3>2. Development and Testing</h3>
        <p>Our team creates dozens of variations, adjusting ratios, testing different base teas, and experimenting with complementary flavors.</p>
        
        <h3>3. Sensory Evaluation</h3>
        <p>Each potential blend undergoes rigorous sensory testing. We evaluate appearance, aroma, taste, mouthfeel, and aftertaste.</p>
        
        <h3>4. Customer Testing</h3>
        <p>Promising blends are tested with small groups of customers to gather feedback and make final adjustments.</p>
        
        <h3>5. Production Scaling</h3>
        <p>Once approved, we work with our operations team to scale the recipe for consistent production across all locations.</p>
        
        <h2>Seasonal Inspirations</h2>
        <p>Our masters draw inspiration from the changing seasons, creating limited-time offerings that capture the essence of each time of year. Spring brings floral notes and fresh greens, summer features cooling fruits and herbs, autumn embraces warming spices, and winter offers comforting, rich flavors.</p>
        
        <p>The next time you visit AloTra, remember that each sip represents the passion, skill, and creativity of our tea masters. They're the unsung artists behind your favorite flavors, constantly working to surprise and delight your palate with new experiences.</p>
      `,
      tags: ['Team', 'Behind the Scenes', 'Tea Masters', 'Flavor Development']
    },
    {
      id: 5,
      title: 'Summer Menu Launch: Tropical Flavors Meet Premium Quality',
      excerpt: 'Explore our new summer collection featuring exotic fruits and refreshing combinations perfect for warm weather.',
      author: 'Chef Isabella Kim',
      date: '2024-01-05',
      readTime: '4 min read',
      category: 'News & Events',
      image: 'https://images.unsplash.com/photo-1603898579713-fd8250f9f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvYmElMjB0ZWF8ZW58MXx8fHwxNzU3ODQ2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      featured: false,
      likes: 178,
      comments: 28,
      fullContent: `
        <p>As the temperature rises, we're excited to unveil our most refreshing summer menu yet! Our new tropical collection features six innovative drinks that transport you to paradise with every sip.</p>
        
        <h2>The Tropical Collection</h2>
        
        <h3>Mango Tango Paradise</h3>
        <p>Real Alphonso mango puree meets jasmine green tea with coconut pearls and a hint of chili for a sweet-spicy kick that'll wake up your taste buds.</p>
        
        <h3>Pineapple Mint Refresh</h3>
        <p>Fresh pineapple juice blended with cooling mint leaves and our signature crystal pearls. Light, refreshing, and surprisingly addictive.</p>
        
        <h3>Dragon Fruit Lemonade</h3>
        <p>The exotic sweetness of dragon fruit combined with tangy lemonade and popping boba that bursts with citrus flavor.</p>
        
        <h3>Coconut Cloud Nine</h3>
        <p>Creamy coconut milk tea with real coconut flakes and our new coconut jelly cubes for the ultimate tropical indulgence.</p>
        
        <h3>Passion Fruit Fizz</h3>
        <p>Sparkling water infused with passion fruit and topped with our innovative fruit caviar pearls.</p>
        
        <h3>Tropical Storm</h3>
        <p>A blend of mango, passion fruit, and pineapple with ice-cold green tea base and rainbow fruit pearls.</p>
        
        <h2>What Makes These Special?</h2>
        <p>Every drink in our tropical collection features real fruit - no artificial flavors or colors. We've partnered with sustainable farms to source the freshest ingredients, ensuring each drink delivers authentic tropical taste while supporting responsible agriculture.</p>
        
        <h2>Limited Time Innovation</h2>
        <p>Some items in our summer collection feature limited-time innovations you won't find anywhere else. Our fruit caviar pearls use molecular gastronomy techniques to create tiny spheres that burst with pure fruit flavor, while our coconut jelly cubes add textural excitement to every sip.</p>
        
        <p>Beat the heat with flavors that celebrate summer's bounty. Visit AloTra today and escape to the tropics - no plane ticket required!</p>
      `,
      tags: ['Summer Menu', 'Tropical Flavors', 'New Products', 'Limited Time']
    },
    {
      id: 6,
      title: 'The Science of Perfect Boba: Texture, Temperature, and Timing',
      excerpt: 'Dive deep into the chemistry and techniques that create the perfect chewy, flavorful boba pearls.',
      author: 'Dr. Alex Chen',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'Health & Wellness',
      image: 'https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      featured: false,
      likes: 134,
      comments: 19,
      fullContent: `
        <p>The perfect boba pearl is a marvel of food science - achieving that ideal balance of chewiness, flavor, and texture requires precise understanding of starch chemistry, temperature control, and timing. Let's explore the science behind these beloved spheres.</p>
        
        <h2>The Chemistry of Chew</h2>
        <p>Tapioca pearls get their distinctive texture from tapioca starch, extracted from cassava root. When heated in water, the starch granules absorb liquid and swell, creating a gel network that gives boba its characteristic QQ (chewy) texture.</p>
        
        <p>The key is controlling the gelatinization process. Too little cooking results in hard centers, while overcooking creates mushy, unpalatable pearls. The sweet spot occurs when the starch is fully hydrated but the structure remains intact.</p>
        
        <h2>Temperature Precision</h2>
        <p>At AloTra, we cook our boba at exactly 212°F (100°C) for the first phase, then reduce to 185°F (85°C) for the final cooking stage. This two-temperature process ensures even cooking throughout while preventing the outer layer from becoming too soft.</p>
        
        <h2>The Golden Ratio</h2>
        <p>Our recipe uses a 1:10 ratio of boba to water, with a precise timing of 15 minutes at high heat followed by 10 minutes at reduced temperature. This creates pearls that are chewy but not tough, with a consistency that holds up in cold drinks for hours.</p>
        
        <h2>Flavor Infusion Techniques</h2>
        <p>Beyond basic brown sugar, we've developed proprietary methods for infusing flavors directly into the pearls during cooking. Our fruit pearls use natural fruit extracts added at specific temperature points to ensure flavor penetrates without compromising texture.</p>
        
        <h2>Storage and Service Science</h2>
        <p>Cooked boba has a limited window of optimal texture - typically 4-6 hours at room temperature. We've developed a storage syrup that maintains moisture and prevents hardening while adding complementary flavors.</p>
        
        <p>The next time you enjoy boba at AloTra, appreciate the precise science that goes into every perfectly chewy pearl!</p>
      `,
      tags: ['Boba', 'Food Science', 'Texture', 'Quality', 'Behind the Scenes']
    }
  ];

  const healthTrends = [
    { title: 'Adaptogenic Teas', description: 'Stress-fighting herbs for modern wellness' },
    { title: 'Plant-Based Proteins', description: 'Protein-rich milk alternatives' },
    { title: 'Functional Ingredients', description: 'Superfoods that boost nutrition' },
    { title: 'Low-Sugar Options', description: 'Natural sweeteners and alternatives' }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(article => article.featured);

  // Related articles for detailed view
  const getRelatedArticles = (currentArticle) => {
    return articles
      .filter(article => 
        article.id !== currentArticle.id && 
        (article.category === currentArticle.category || 
         article.tags.some(tag => currentArticle.tags.includes(tag)))
      )
      .slice(0, 3);
  };

  // Detailed Article View Component
  const DetailedArticleView = ({ article, onBack }) => {
    const relatedArticles = getRelatedArticles(article);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="min-h-screen pt-24 pb-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onBack}
            className="mb-8 flex items-center space-x-2 text-[#7c9885] hover:text-[#6b8470] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Blog</span>
          </motion.button>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6 mb-12"
          >
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit rounded-full">
                {article.category}
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center space-x-4 ml-auto">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{article.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{article.comments}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="aspect-video rounded-3xl overflow-hidden glass neomorphic">
              <ImageWithFallback
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              {article.hasVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl"
                  >
                    <Play className="w-10 h-10 text-[#7c9885] ml-1" />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none mb-12"
          >
            <div 
              className="text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.fullContent }}
            />
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="font-semibold mb-4 flex items-center">
              <Tag className="w-5 h-5 text-[#f5a9bc] mr-2" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <Card className="glass rounded-2xl p-6 border-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Share this article</h3>
                <div className="flex space-x-3">
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full">
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-8">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle, index) => (
                  <motion.div
                    key={relatedArticle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Card 
                      className="glass neomorphic rounded-3xl overflow-hidden border-0 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
                      onClick={() => {
                        setSelectedArticle(relatedArticle);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className="relative h-48">
                        <ImageWithFallback
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <Badge variant="outline" className="mb-3 rounded-full">
                          {relatedArticle.category}
                        </Badge>
                        <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{relatedArticle.readTime}</span>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{relatedArticle.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{relatedArticle.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  if (showDetailView && selectedArticle) {
    return (
      <DetailedArticleView
        article={selectedArticle}
        onBack={() => {
          setShowDetailView(false);
          setSelectedArticle(null);
        }}
      />
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
            The AloTra Journal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stories, recipes, and insights from the world of premium tea culture
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <Input
              type="text"
              placeholder="Search articles, recipes, and stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl glass border-0 text-lg"
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-2xl transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white shadow-lg'
                    : 'glass hover:glass-strong'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <Card className="glass neomorphic rounded-3xl overflow-hidden border-0 cursor-pointer hover:shadow-2xl transition-all duration-300"
              onClick={() => {
                setSelectedArticle(featuredArticle);
                setShowDetailView(true);
              }}
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative h-80 lg:h-auto">
                  <ImageWithFallback
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] text-white border-0">
                      Featured
                    </Badge>
                  </div>
                  {featuredArticle.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl"
                      >
                        <Play className="w-8 h-8 text-[#7c9885] ml-1" />
                      </motion.button>
                    </div>
                  )}
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-4">
                    <Badge variant="outline" className="w-fit rounded-full">
                      {featuredArticle.category}
                    </Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{featuredArticle.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredArticle.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredArticle.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <Button className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl px-8">
                        Read Full Article
                      </Button>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Heart className="w-5 h-5" />
                          <span>{featuredArticle.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <MessageCircle className="w-5 h-5" />
                          <span>{featuredArticle.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-8">
              {filteredArticles.filter(article => !article.featured).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card 
                    className="glass neomorphic rounded-3xl overflow-hidden border-0 h-full hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      setSelectedArticle(article);
                      setShowDetailView(true);
                    }}
                  >
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      {article.hasVideo && (
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                            <Play className="w-4 h-4 text-[#7c9885]" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="outline" className="bg-white/90 text-gray-800 border-0 rounded-full">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold leading-tight line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-2">
                            <User className="w-3 h-3" />
                            <span>{article.author}</span>
                          </div>
                          <span>{article.readTime}</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{article.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{article.comments}</span>
                            </div>
                          </div>
                          <button className="text-[#7c9885] hover:text-[#6b8470] transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Health Trends */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Tag className="w-5 h-5 text-[#f5a9bc] mr-2" />
                  Health Trends
                </h3>
                <div className="space-y-4">
                  {healthTrends.map((trend, index) => (
                    <motion.div
                      key={trend.title}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="glass-strong rounded-2xl p-4 hover:bg-white/50 transition-colors cursor-pointer"
                    >
                      <h4 className="font-medium text-sm mb-1">{trend.title}</h4>
                      <p className="text-xs text-gray-600">{trend.description}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] flex items-center justify-center">
                  <span className="text-white text-2xl">📧</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Get the latest recipes, health tips, and tea culture insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-2xl border-0 glass"
                  />
                  <Button className="w-full bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  No spam, unsubscribe anytime
                </p>
              </Card>
            </motion.div>

            {/* Popular Articles */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0">
                <h3 className="text-xl font-semibold mb-6">Popular This Week</h3>
                <div className="space-y-4">
                  {articles.slice(0, 3).map((article, index) => (
                    <div 
                      key={article.id} 
                      className="flex space-x-3 cursor-pointer hover:bg-white/30 p-2 rounded-xl transition-colors"
                      onClick={() => {
                        setSelectedArticle(article);
                        setShowDetailView(true);
                      }}
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-sm leading-tight line-clamp-2 mb-1">
                          {article.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{article.readTime}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{article.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-2 border-[#7c9885] text-[#7c9885] hover:bg-[#7c9885] hover:text-white rounded-2xl px-8 py-3"
          >
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
}