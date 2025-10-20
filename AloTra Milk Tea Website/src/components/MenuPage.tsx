import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Star, Heart, Leaf, Zap, Eye, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AiComboSuggestions } from './AiComboSuggestions';

interface MenuPageProps {
  onPageChange: (page: string) => void;
  onAddToCart: (product: any) => void;
  isAuthenticated?: boolean;
  onShowAuthModal?: () => void;
}

export function MenuPage({ onPageChange, onAddToCart, isAuthenticated = false, onShowAuthModal = () => {} }: MenuPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Classic Milk Tea",
      price: 4.50,
      image: "https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      category: "Classic",
      tags: ["bestseller", "classic"],
      calories: 180,
      description: "Our signature black tea with creamy milk and brown sugar pearls",
      longDescription: "Experience the perfect blend of traditional Ceylon black tea with rich, creamy milk and hand-made brown sugar pearls. This classic combination has been our bestseller since day one, offering a comforting taste that brings back childhood memories. Each cup is carefully crafted with premium ingredients and served at the perfect temperature.",
      isVegan: false,
      isSustainable: true,
      ingredients: ["Ceylon Black Tea", "Fresh Milk", "Brown Sugar Pearls", "Natural Sweetener"],
      allergens: ["Dairy"],
      nutritionFacts: {
        calories: 180,
        protein: "8g",
        carbs: "24g",
        fat: "6g",
        sugar: "18g"
      }
    },
    {
      id: 2,
      name: "Matcha Supreme",
      price: 5.90,
      image: "https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      category: "Green Tea",
      tags: ["premium", "antioxidant"],
      calories: 150,
      description: "Premium Japanese matcha with oat milk and honey pearls",
      longDescription: "Sourced directly from Uji, Japan, our ceremonial-grade matcha delivers an authentic, rich umami flavor with natural sweetness. Paired with creamy oat milk and delicate honey pearls, this drink offers a perfect balance of tradition and innovation while providing powerful antioxidants.",
      isVegan: true,
      isSustainable: true,
      ingredients: ["Ceremonial Matcha", "Oat Milk", "Honey Pearls", "Organic Sweetener"],
      allergens: ["None"],
      nutritionFacts: {
        calories: 150,
        protein: "5g",
        carbs: "20g",
        fat: "4g",
        sugar: "15g"
      }
    },
    {
      id: 3,
      name: "Tropical Passion",
      price: 5.20,
      image: "https://images.unsplash.com/photo-1603898579713-fd8250f9f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvYmElMjB0ZWF8ZW58MXx8fHwxNzU3ODQ2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      category: "Fruit Tea",
      tags: ["fruity", "refreshing"],
      calories: 120,
      description: "Tropical fruit blend with passion fruit and mango pearls",
      longDescription: "Escape to paradise with our vibrant tropical blend featuring real passion fruit, mango, and pineapple. This refreshing drink combines the tangy sweetness of exotic fruits with our signature fruit pearls that burst with flavor in every sip. Perfect for hot summer days!",
      isVegan: true,
      isSustainable: false,
      ingredients: ["Passion Fruit", "Mango Juice", "Pineapple", "Fruit Pearls", "Natural Flavoring"],
      allergens: ["None"],
      nutritionFacts: {
        calories: 120,
        protein: "2g",
        carbs: "28g",
        fat: "0g",
        sugar: "24g"
      }
    },
    {
      id: 4,
      name: "Brown Sugar Delight",
      price: 6.50,
      image: "https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      category: "Classic",
      tags: ["premium", "sweet"],
      calories: 220,
      description: "Rich brown sugar syrup with fresh milk and chewy pearls",
      longDescription: "Indulge in the rich, caramelized sweetness of our house-made brown sugar syrup, slowly cooked to perfection. Combined with farm-fresh milk and our signature chewy tapioca pearls, this premium drink offers a luxurious texture and deep, complex flavors that dance on your palate.",
      isVegan: false,
      isSustainable: true,
      ingredients: ["Brown Sugar Syrup", "Fresh Whole Milk", "Tapioca Pearls", "Natural Caramel"],
      allergens: ["Dairy"],
      nutritionFacts: {
        calories: 220,
        protein: "10g",
        carbs: "32g",
        fat: "8g",
        sugar: "28g"
      }
    },
    {
      id: 5,
      name: "Taro Cloud",
      price: 5.80,
      image: "https://images.unsplash.com/photo-1603898579713-fd8250f9f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvYmElMjB0ZWF8ZW58MXx8fHwxNzU3ODQ2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      category: "Specialty",
      tags: ["unique", "creamy"],
      calories: 200,
      description: "Smooth taro flavor with coconut milk and tapioca pearls",
      longDescription: "Experience the unique, nutty sweetness of authentic taro root combined with creamy coconut milk. This purple-hued delight offers a smooth, velvety texture enhanced by perfectly cooked tapioca pearls. A customer favorite for its distinctive flavor and Instagram-worthy appearance.",
      isVegan: true,
      isSustainable: false,
      ingredients: ["Real Taro Root", "Coconut Milk", "Tapioca Pearls", "Coconut Sugar"],
      allergens: ["Coconut"],
      nutritionFacts: {
        calories: 200,
        protein: "6g",
        carbs: "26g",
        fat: "9g",
        sugar: "20g"
      }
    },
    {
      id: 6,
      name: "Earl Grey Elegance",
      price: 5.40,
      image: "https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      category: "Black Tea",
      tags: ["classic", "elegant"],
      calories: 160,
      description: "Classic Earl Grey with bergamot and vanilla milk foam",
      longDescription: "Sophisticated and timeless, our Earl Grey Elegance features premium black tea infused with natural bergamot oil and topped with a silky vanilla milk foam. This refined drink pays homage to the classic British tradition while adding modern touches for the perfect afternoon treat.",
      isVegan: false,
      isSustainable: true,
      ingredients: ["Earl Grey Tea", "Bergamot Oil", "Milk", "Vanilla Extract", "Milk Foam"],
      allergens: ["Dairy"],
      nutritionFacts: {
        calories: 160,
        protein: "7g",
        carbs: "18g",
        fat: "7g",
        sugar: "14g"
      }
    },
    // Add more products for infinite scroll demo
    ...Array(12).fill(null).map((_, index) => ({
      id: 7 + index,
      name: `Special Blend ${index + 1}`,
      price: 4.80 + (index * 0.30),
      image: "https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.5 + (Math.random() * 0.4),
      category: ["Classic", "Green Tea", "Fruit Tea"][index % 3],
      tags: ["special", "limited"],
      calories: 140 + (index * 10),
      description: `Unique blend featuring special ingredients and premium quality`,
      longDescription: `This special blend ${index + 1} features a unique combination of carefully selected ingredients that create a distinctive flavor profile. Each cup is crafted with precision to deliver a memorable taste experience.`,
      isVegan: index % 2 === 0,
      isSustainable: index % 3 === 0,
      ingredients: ["Tea Base", "Premium Ingredients", "Natural Flavoring"],
      allergens: index % 2 === 0 ? ["None"] : ["Dairy"],
      nutritionFacts: {
        calories: 140 + (index * 10),
        protein: "4g",
        carbs: "22g",
        fat: "3g",
        sugar: "16g"
      }
    }))
  ];

  const filterOptions = [
    { id: 'vegan', label: 'Vegan', icon: Leaf },
    { id: 'low-calorie', label: 'Low Calorie (<150)', icon: Zap },
    { id: 'sustainable', label: 'Sustainable', icon: Heart },
    { id: 'bestseller', label: 'Bestseller', icon: Star }
  ];

  const categories = ['All', 'Classic', 'Green Tea', 'Fruit Tea', 'Black Tea', 'Specialty'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesFilters = selectedFilters.every(filter => {
      switch (filter) {
        case 'vegan': return product.isVegan;
        case 'low-calorie': return product.calories < 150;
        case 'sustainable': return product.isSustainable;
        case 'bestseller': return product.tags.includes('bestseller');
        default: return true;
      }
    });
    return matchesSearch && matchesCategory && matchesFilters;
  });

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedProducts(prev => prev + 6);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      if (!isLoading && displayedProducts < filteredProducts.length) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, displayedProducts, filteredProducts.length]);

  // Detailed Product View Component
  const DetailedProductView = ({ product, onBack }) => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 text-[#7c9885] hover:text-[#6b8470] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Menu</span>
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass neomorphic">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {product.tags.includes('bestseller') && (
                <Badge className="bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  Bestseller
                </Badge>
              )}
              {product.isVegan && (
                <Badge className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white border-0">
                  <Leaf className="w-3 h-3 mr-1" />
                  Vegan
                </Badge>
              )}
              {product.isSustainable && (
                <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                  <Heart className="w-3 h-3 mr-1" />
                  Sustainable
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600 font-medium">{product.rating}</span>
                </div>
                <Badge variant="outline" className="rounded-full">
                  {product.category}
                </Badge>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed">
                {product.longDescription || product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-5xl font-bold text-[#7c9885]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-lg text-gray-500">{product.calories} cal</span>
            </div>

            {/* Ingredients */}
            {product.ingredients && (
              <Card className="glass rounded-2xl p-6 border-0">
                <h3 className="font-semibold mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="outline" className="rounded-full">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Nutrition Facts */}
            {product.nutritionFacts && (
              <Card className="glass rounded-2xl p-6 border-0">
                <h3 className="font-semibold mb-4">Nutrition Facts</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.nutritionFacts).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize text-gray-600">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Allergens */}
            {product.allergens && (
              <Card className="glass rounded-2xl p-6 border-0">
                <h3 className="font-semibold mb-3">Allergen Information</h3>
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map((allergen, index) => (
                    <Badge key={index} variant="destructive" className="rounded-full">
                      {allergen}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* AI Combo Suggestion */}
            <div className="flex justify-center">
              <AiComboSuggestions
                isAuthenticated={isAuthenticated}
                onShowAuthModal={onShowAuthModal}
                onAddToCart={onAddToCart}
                currentProduct={product}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl py-4 text-lg hover:shadow-lg transition-all duration-300"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#7c9885] text-[#7c9885] hover:bg-[#7c9885] hover:text-white rounded-2xl py-4 px-8"
                size="lg"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  if (showDetailView && detailProduct) {
    return (
      <DetailedProductView
        product={detailProduct}
        onBack={() => {
          setShowDetailView(false);
          setDetailProduct(null);
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
            Our Menu
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your perfect blend from our carefully crafted collection
          </p>
        </motion.div>

        {/* AI Combo Suggestion Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 flex justify-center"
        >
          <AiComboSuggestions
            isAuthenticated={isAuthenticated}
            onShowAuthModal={onShowAuthModal}
            onAddToCart={onAddToCart}
          />
        </motion.div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for your favorite drink..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-2xl glass border-0 backdrop-blur-sm text-lg"
            />
          </motion.div>

          {/* Category Pills */}
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

          {/* Filter Options */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {filterOptions.map((filter) => {
              const Icon = filter.icon;
              const isSelected = selectedFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => handleFilterToggle(filter.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] text-white shadow-md'
                      : 'glass hover:glass-strong'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredProducts.slice(0, displayedProducts).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="h-fit"
            >
              <Card className="glass neomorphic rounded-3xl overflow-hidden border-0 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="relative">
                  <div className="relative h-64 overflow-hidden cursor-pointer"
                    onClick={() => {
                      setDetailProduct(product);
                      setShowDetailView(true);
                    }}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="p-2 rounded-full glass-strong hover:bg-white/40 transition-all duration-200">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 rounded-full glass-strong hover:bg-white/40 transition-all duration-200"
                    >
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.tags.includes('bestseller') && (
                      <Badge className="bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] text-white border-0">
                        <Star className="w-3 h-3 mr-1" />
                        Bestseller
                      </Badge>
                    )}
                    {product.isVegan && (
                      <Badge className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white border-0">
                        <Leaf className="w-3 h-3 mr-1" />
                        Vegan
                      </Badge>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-4 right-4 glass-strong rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-white">{product.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 cursor-pointer hover:text-[#7c9885] transition-colors"
                        onClick={() => {
                          setDetailProduct(product);
                          setShowDetailView(true);
                        }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{product.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{product.calories} cal</span>
                      <span>{product.category}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#7c9885]">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setDetailProduct(product);
                            setShowDetailView(true);
                          }}
                          className="rounded-xl border-2 border-gray-200 hover:border-[#7c9885] hover:text-[#7c9885]"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => onAddToCart(product)}
                          className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] hover:from-[#6b8470] hover:to-[#8db391] text-white rounded-xl"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading More */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7c9885]"></div>
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && displayedProducts < filteredProducts.length && (
          <div className="text-center mt-12">
            <Button
              onClick={loadMore}
              className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl px-8 py-3 hover:shadow-lg transition-all duration-300"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="glass-strong rounded-3xl border-0 max-w-2xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(selectedProduct.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">{selectedProduct.rating}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600">{selectedProduct.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Calories:</span>
                      <span>{selectedProduct.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span>{selectedProduct.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vegan:</span>
                      <span>{selectedProduct.isVegan ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-3xl font-bold text-[#7c9885]">
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedProduct(null);
                          setDetailProduct(selectedProduct);
                          setShowDetailView(true);
                        }}
                        className="rounded-xl"
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() => {
                          onAddToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-xl px-6"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}