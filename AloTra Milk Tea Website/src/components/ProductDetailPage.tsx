import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, Share2, Plus, Minus, RotateCcw, Box, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AiComboSuggestions } from './AiComboSuggestions';

interface ProductDetailPageProps {
  onAddToCart: (product: any) => void;
  onPageChange: (page: string) => void;
  isAuthenticated?: boolean;
  onShowAuthModal?: () => void;
}

export function ProductDetailPage({ onAddToCart, onPageChange, isAuthenticated = false, onShowAuthModal = () => {} }: ProductDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showARPreview, setShowARPreview] = useState(false);

  const product = {
    id: 1,
    name: 'Matcha Supreme',
    price: 5.90,
    rating: 4.9,
    reviewCount: 234,
    description: 'Premium Japanese matcha powder blended with creamy oat milk and sweetened with organic honey. Our signature drink combines traditional tea ceremony techniques with modern flavor profiles.',
    images: [
      'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1603898579713-fd8250f9f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvYmElMjB0ZWF8ZW58MXx8fHwxNzU3ODQ2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    nutritionalInfo: {
      calories: 150,
      caffeine: '35mg',
      sugar: '12g',
      protein: '4g'
    },
    ingredients: ['Premium Matcha Powder', 'Organic Oat Milk', 'Honey', 'Natural Vanilla Extract'],
    allergens: ['May contain traces of nuts'],
    tags: ['Antioxidant Rich', 'Energy Boost', 'Vegan Option', 'Organic']
  };

  const sizes = [
    { name: 'Small', price: 0, volume: '12oz' },
    { name: 'Regular', price: 0, volume: '16oz' },
    { name: 'Large', price: 1.50, volume: '20oz' }
  ];

  const toppings = [
    { name: 'Boba Pearls', price: 0.80 },
    { name: 'Honey Pearls', price: 0.90 },
    { name: 'Coconut Jelly', price: 0.70 },
    { name: 'Aloe Vera', price: 0.60 },
    { name: 'Cheese Foam', price: 1.50 },
    { name: 'Pudding', price: 1.20 }
  ];

  const relatedProducts = [
    { id: 2, name: 'Green Tea Latte', price: 4.80, image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 3, name: 'Matcha Milk Tea', price: 5.20, image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 4, name: 'Iced Matcha', price: 4.50, image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080' }
  ];

  const reviews = [
    { id: 1, user: 'Sarah M.', rating: 5, comment: 'Perfect balance of matcha flavor and creaminess!', date: '2024-01-10', verified: true },
    { id: 2, user: 'Mike C.', rating: 5, comment: 'Best matcha drink I\'ve ever had. The quality is outstanding.', date: '2024-01-08', verified: true },
    { id: 3, user: 'Emma L.', rating: 4, comment: 'Really smooth and not too sweet. Love the oat milk choice.', date: '2024-01-05', verified: true }
  ];

  const handleToppingToggle = (toppingName: string) => {
    setSelectedToppings(prev => 
      prev.includes(toppingName) 
        ? prev.filter(t => t !== toppingName)
        : [...prev, toppingName]
    );
  };

  const calculateTotalPrice = () => {
    const sizePrice = sizes.find(s => s.name === selectedSize)?.price || 0;
    const toppingsPrice = selectedToppings.reduce((total, toppingName) => {
      const topping = toppings.find(t => t.name === toppingName);
      return total + (topping?.price || 0);
    }, 0);
    return (product.price + sizePrice + toppingsPrice) * quantity;
  };

  const handleAddToCart = () => {
    const customProduct = {
      ...product,
      size: selectedSize,
      toppings: selectedToppings,
      quantity,
      totalPrice: calculateTotalPrice()
    };
    onAddToCart(customProduct);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image with 360° View */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <Card className="glass neomorphic rounded-3xl overflow-hidden border-0">
                <div className="relative h-96 lg:h-[500px]">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-3 rounded-full glass-strong transition-all duration-300 ${
                        isWishlisted ? 'bg-red-500 text-white' : 'hover:bg-white/40'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full glass-strong hover:bg-white/40 transition-all duration-300"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowARPreview(true)}
                      className="p-3 rounded-full glass-strong hover:bg-white/40 transition-all duration-300"
                    >
                      <Box className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* 360° Indicator */}
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white border-0">
                      <RotateCcw className="w-3 h-3 mr-1" />
                      360° View
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300 ${
                    currentImageIndex === index 
                      ? 'ring-4 ring-[#7c9885] ring-opacity-50' 
                      : 'glass hover:glass-strong'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
                
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
                    <span className="ml-2 text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
              </div>
            </motion.div>

            {/* Size Selection */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0">
                <h3 className="text-lg font-semibold mb-4">Choose Size</h3>
                <div className="grid grid-cols-3 gap-3">
                  {sizes.map((size) => (
                    <motion.button
                      key={size.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSize(size.name)}
                      className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                        selectedSize === size.name
                          ? 'bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white shadow-lg'
                          : 'glass-strong hover:glass'
                      }`}
                    >
                      <div className="font-medium">{size.name}</div>
                      <div className="text-sm opacity-80">{size.volume}</div>
                      {size.price > 0 && (
                        <div className="text-sm">+${size.price.toFixed(2)}</div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Toppings */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0">
                <h3 className="text-lg font-semibold mb-4">Add Toppings</h3>
                <div className="grid grid-cols-2 gap-3">
                  {toppings.map((topping) => (
                    <motion.button
                      key={topping.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleToppingToggle(topping.name)}
                      className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                        selectedToppings.includes(topping.name)
                          ? 'bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] text-white shadow-lg'
                          : 'glass-strong hover:glass'
                      }`}
                    >
                      <div className="font-medium">{topping.name}</div>
                      <div className="text-sm opacity-80">+${topping.price.toFixed(2)}</div>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quantity and Add to Cart */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Quantity</h3>
                    <p className="text-sm text-gray-600">Choose how many you'd like</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span>Total Price:</span>
                    <span className="text-2xl font-bold text-[#7c9885]">
                      ${calculateTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  
                  {/* AI Combo Suggestion */}
                  <div className="flex justify-center py-2">
                    <AiComboSuggestions
                      isAuthenticated={isAuthenticated}
                      onShowAuthModal={onShowAuthModal}
                      onAddToCart={onAddToCart}
                      currentProduct={product}
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleAddToCart}
                      className="flex-grow bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl h-12 hover:shadow-lg transition-all duration-300"
                    >
                      <ShoppingCart className="mr-2 w-5 h-5" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => onPageChange('customize')}
                      variant="outline"
                      className="px-6 rounded-2xl h-12 border-2 border-[#7c9885] text-[#7c9885] hover:bg-[#7c9885] hover:text-white"
                    >
                      Customize
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="glass neomorphic rounded-2xl p-2 w-full max-w-md mx-auto grid grid-cols-3">
              <TabsTrigger 
                value="details" 
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c9885] data-[state=active]:to-[#a4c4a8] data-[state=active]:text-white"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="nutrition"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c9885] data-[state=active]:to-[#a4c4a8] data-[state=active]:text-white"
              >
                Nutrition
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c9885] data-[state=active]:to-[#a4c4a8] data-[state=active]:text-white"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="details">
                <Card className="glass neomorphic rounded-3xl p-8 border-0">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                      <ul className="space-y-2">
                        {product.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-[#7c9885] rounded-full" />
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Allergen Information</h3>
                      <ul className="space-y-2">
                        {product.allergens.map((allergen, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-[#f5a9bc] rounded-full" />
                            <span>{allergen}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="nutrition">
                <Card className="glass neomorphic rounded-3xl p-8 border-0">
                  <h3 className="text-xl font-semibold mb-6">Nutritional Information (Regular Size)</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                      <div key={key} className="text-center glass-strong rounded-2xl p-6">
                        <div className="text-2xl font-bold text-[#7c9885] mb-2">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="glass neomorphic rounded-3xl p-8 border-0">
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="glass-strong rounded-2xl p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">{review.user}</span>
                              {review.verified && (
                                <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
            You Might Also Like
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass neomorphic rounded-3xl overflow-hidden border-0 cursor-pointer hover:shadow-xl transition-all duration-300">
                  <div className="h-48">
                    <ImageWithFallback
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-[#7c9885]">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-xl"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AR Preview Modal */}
      <AnimatePresence>
        {showARPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowARPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] flex items-center justify-center">
                <Box className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">AR Preview</h3>
              <p className="text-gray-600 mb-6">
                See how this drink looks in your environment using augmented reality
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl">
                  Open Camera
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowARPreview(false)}
                  className="w-full rounded-2xl"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}