import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingCart, Loader2, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AiComboSuggestionsProps {
  isAuthenticated: boolean;
  onShowAuthModal: () => void;
  onAddToCart: (product: any) => void;
  currentProduct?: any;
}

export function AiComboSuggestions({ 
  isAuthenticated, 
  onShowAuthModal, 
  onAddToCart,
  currentProduct 
}: AiComboSuggestionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedCombos, setSuggestedCombos] = useState<any[]>([]);

  // Mock AI suggestions based on current product or general suggestions
  const generateSuggestions = () => {
    const allCombos = [
      {
        id: 'combo-1',
        name: 'Matcha Energy Boost',
        description: 'Since you like Matcha Supreme, try it with Honey Pearls + Cheese Foam for the perfect afternoon pick-me-up!',
        image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        calories: 180,
        price: 7.30,
        items: [
          { name: 'Matcha Supreme', price: 5.90 },
          { name: 'Honey Pearls', price: 0.90 },
          { name: 'Cheese Foam', price: 1.50 }
        ],
        category: 'Green Tea Combo',
        tags: ['Antioxidant', 'Energy']
      },
      {
        id: 'combo-2',
        name: 'Sweet Dreams Combo',
        description: 'Perfect for milk tea lovers! Brown Sugar Delight + Black Sugar Pearls + Pudding creates ultimate sweetness.',
        image: 'https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080',
        calories: 340,
        price: 8.50,
        items: [
          { name: 'Brown Sugar Delight', price: 6.50 },
          { name: 'Black Sugar Pearls', price: 0.80 },
          { name: 'Pudding', price: 1.20 }
        ],
        category: 'Sweet Combo',
        tags: ['Premium', 'Indulgent']
      },
      {
        id: 'combo-3',
        name: 'Tropical Paradise',
        description: 'Tropical Passion + Coconut Jelly + Aloe Vera brings summer vibes to your day!',
        image: 'https://images.unsplash.com/photo-1603898579713-fd8250f9f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvYmElMjB0ZWF8ZW58MXx8fHwxNzU3ODQ2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        calories: 150,
        price: 6.50,
        items: [
          { name: 'Tropical Passion', price: 5.20 },
          { name: 'Coconut Jelly', price: 0.70 },
          { name: 'Aloe Vera', price: 0.60 }
        ],
        category: 'Fruit Combo',
        tags: ['Refreshing', 'Low Calorie']
      },
      {
        id: 'combo-4',
        name: 'Classic Comfort',
        description: 'Earl Grey Elegance + Brown Sugar Pearls + Vanilla Milk Foam for sophisticated taste.',
        image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        calories: 220,
        price: 7.10,
        items: [
          { name: 'Earl Grey Elegance', price: 5.40 },
          { name: 'Brown Sugar Pearls', price: 0.80 },
          { name: 'Vanilla Milk Foam', price: 0.90 }
        ],
        category: 'Classic Combo',
        tags: ['Elegant', 'Traditional']
      }
    ];

    // Filter suggestions based on current product or return all
    if (currentProduct) {
      const productName = currentProduct.name;
      if (productName.toLowerCase().includes('matcha')) {
        return [allCombos[0], allCombos[3]];
      } else if (productName.toLowerCase().includes('brown sugar') || productName.toLowerCase().includes('milk tea')) {
        return [allCombos[1], allCombos[3]];
      } else if (productName.toLowerCase().includes('tropical') || productName.toLowerCase().includes('fruit')) {
        return [allCombos[2], allCombos[0]];
      }
    }
    
    // Return random 2-3 suggestions
    const shuffled = [...allCombos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const handleAiSuggestionClick = () => {
    if (!isAuthenticated) {
      onShowAuthModal();
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const suggestions = generateSuggestions();
      setSuggestedCombos(suggestions);
      setIsLoading(false);
      setShowSuggestions(true);
    }, 2000);
  };

  const handleAddComboToCart = (combo: any) => {
    // Create a combo product to add to cart
    const comboProduct = {
      id: combo.id,
      name: combo.name,
      price: combo.price,
      image: combo.image,
      calories: combo.calories,
      category: combo.category,
      description: combo.description,
      tags: combo.tags,
      isCombo: true,
      comboItems: combo.items
    };

    onAddToCart(comboProduct);
    setShowSuggestions(false);
  };

  const LoadingAnimation = () => (
    <div className="flex items-center justify-center space-x-1">
      <motion.div
        className="w-2 h-2 bg-white rounded-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 bg-white rounded-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-white rounded-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );

  return (
    <>
      {/* AI Combo Suggestion Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <motion.button
          onClick={handleAiSuggestionClick}
          disabled={isLoading}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(124, 152, 133, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] text-white rounded-2xl px-6 py-3 font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] opacity-0"
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Button content */}
          <div className="relative flex items-center space-x-2">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>AI Thinking</span>
                <LoadingAnimation />
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>AI Combo Suggestion</span>
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.div>
              </>
            )}
          </div>
        </motion.button>
      </motion.div>

      {/* Suggestions Modal */}
      <Dialog open={showSuggestions} onOpenChange={setShowSuggestions}>
        <DialogContent className="glass-strong rounded-3xl border-0 max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="text-center pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent flex items-center justify-center space-x-2">
              <Sparkles className="w-6 h-6 text-[#7c9885]" />
              <span>AI Combo Suggestions</span>
              <Zap className="w-6 h-6 text-[#f5a9bc]" />
            </DialogTitle>
            <p className="text-gray-600 mt-2">
              Personalized recommendations just for you!
            </p>
          </DialogHeader>

          <div className="space-y-6 max-h-[60vh] overflow-y-auto">
            {suggestedCombos.map((combo, index) => (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass rounded-2xl p-6 border-0 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
                    {/* Combo Image */}
                    <div className="flex-shrink-0">
                      <div className="w-full lg:w-32 h-32 rounded-2xl overflow-hidden">
                        <ImageWithFallback
                          src={combo.image}
                          alt={combo.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Combo Details */}
                    <div className="flex-grow space-y-3">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">{combo.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white border-0">
                              {combo.category}
                            </Badge>
                            {combo.tags.map((tag: string) => (
                              <Badge key={tag} variant="outline" className="rounded-full">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#7c9885]">
                            ${combo.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {combo.calories} cal
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {combo.description}
                      </p>

                      {/* Combo Items */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Includes:</h4>
                        <div className="flex flex-wrap gap-2">
                          {combo.items.map((item: any, itemIndex: number) => (
                            <div 
                              key={itemIndex}
                              className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 text-sm"
                            >
                              <span>{item.name}</span>
                              <span className="text-gray-500">(${item.price.toFixed(2)})</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-end pt-2">
                        <Button
                          onClick={() => handleAddComboToCart(combo)}
                          className="bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] text-white rounded-xl hover:shadow-lg transition-all duration-300"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add Combo to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Suggestions powered by AI based on your preferences and popular combinations
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}