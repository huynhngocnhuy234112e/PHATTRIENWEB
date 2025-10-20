import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, RotateCcw, Sparkles, Box, Coffee } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CustomizePageProps {
  onAddToCart: (product: any) => void;
}

export function CustomizePage({ onAddToCart }: CustomizePageProps) {
  const [selectedBase, setSelectedBase] = useState('classic-milk-tea');
  const [selectedToppings, setSelectedToppings] = useState<{[key: string]: number}>({});
  const [sweetness, setSweetness] = useState([50]);
  const [iceLevel, setIceLevel] = useState([50]);
  const [totalCalories, setTotalCalories] = useState(180);
  const [totalPrice, setTotalPrice] = useState(4.50);

  const bases = [
    {
      id: 'classic-milk-tea',
      name: 'Classic Milk Tea',
      price: 4.50,
      calories: 180,
      image: 'https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'matcha-supreme',
      name: 'Matcha Supreme',
      price: 5.90,
      calories: 150,
      image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'tropical-passion',
      name: 'Tropical Passion',
      price: 5.20,
      calories: 120,
      image: 'https://images.unsplash.com/photo-1603898579713-fd8250f9f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvYmElMjB0ZWF8ZW58MXx8fHwxNzU3ODQ2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const toppings = [
    { id: 'boba-pearls', name: 'Boba Pearls', price: 0.80, calories: 40 },
    { id: 'honey-pearls', name: 'Honey Pearls', price: 0.90, calories: 35 },
    { id: 'chocolate-pearls', name: 'Chocolate Pearls', price: 1.00, calories: 50 },
    { id: 'coconut-jelly', name: 'Coconut Jelly', price: 0.70, calories: 25 },
    { id: 'aloe-vera', name: 'Aloe Vera', price: 0.60, calories: 15 },
    { id: 'grass-jelly', name: 'Grass Jelly', price: 0.75, calories: 20 },
    { id: 'pudding', name: 'Pudding', price: 1.20, calories: 60 },
    { id: 'cheese-foam', name: 'Cheese Foam', price: 1.50, calories: 80 }
  ];

  const handleToppingChange = (toppingId: string, change: number) => {
    const newToppings = { ...selectedToppings };
    const currentAmount = newToppings[toppingId] || 0;
    const newAmount = Math.max(0, Math.min(3, currentAmount + change));
    
    if (newAmount === 0) {
      delete newToppings[toppingId];
    } else {
      newToppings[toppingId] = newAmount;
    }
    
    setSelectedToppings(newToppings);
    calculateTotals(selectedBase, newToppings, sweetness[0], iceLevel[0]);
  };

  const calculateTotals = (base: string, toppings: {[key: string]: number}, sweet: number, ice: number) => {
    const baseData = bases.find(b => b.id === base);
    let price = baseData?.price || 0;
    let calories = baseData?.calories || 0;

    // Add toppings
    Object.entries(toppings).forEach(([toppingId, amount]) => {
      const topping = toppingsData.find(t => t.id === toppingId);
      if (topping) {
        price += topping.price * amount;
        calories += topping.calories * amount;
      }
    });

    // Adjust for sweetness
    calories = calories * (sweet / 100);

    setTotalPrice(price);
    setTotalCalories(Math.round(calories));
  };

  const toppingsData = toppings;

  const resetCustomization = () => {
    setSelectedBase('classic-milk-tea');
    setSelectedToppings({});
    setSweetness([50]);
    setIceLevel([50]);
    calculateTotals('classic-milk-tea', {}, 50, 50);
  };

  const handleAddToCart = () => {
    const selectedBaseData = bases.find(b => b.id === selectedBase);
    const customProduct = {
      id: Date.now(),
      name: `Custom ${selectedBaseData?.name}`,
      price: totalPrice,
      image: selectedBaseData?.image,
      calories: totalCalories,
      customization: {
        base: selectedBase,
        toppings: selectedToppings,
        sweetness: sweetness[0],
        iceLevel: iceLevel[0]
      }
    };
    onAddToCart(customProduct);
  };

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
            Customize Your Perfect Cup
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create your signature drink with our drag-and-drop builder and real-time preview
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Customization Panel */}
          <div className="space-y-8">
            {/* Base Selection */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Coffee className="mr-3 w-6 h-6 text-[#7c9885]" />
                  Choose Your Base
                </h2>
                <div className="grid gap-4">
                  {bases.map((base) => (
                    <motion.button
                      key={base.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedBase(base.id);
                        calculateTotals(base.id, selectedToppings, sweetness[0], iceLevel[0]);
                      }}
                      className={`flex items-center p-4 rounded-2xl transition-all duration-300 ${
                        selectedBase === base.id
                          ? 'bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white shadow-lg'
                          : 'glass-strong hover:glass'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden mr-4 flex-shrink-0">
                        <ImageWithFallback
                          src={base.image}
                          alt={base.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left flex-grow">
                        <h3 className="font-semibold">{base.name}</h3>
                        <p className={`text-sm ${selectedBase === base.id ? 'text-white/80' : 'text-gray-600'}`}>
                          ${base.price.toFixed(2)} • {base.calories} cal
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Toppings Selection */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Sparkles className="mr-3 w-6 h-6 text-[#f5a9bc]" />
                  Add Toppings
                </h2>
                <div className="grid gap-3">
                  {toppings.map((topping) => {
                    const amount = selectedToppings[topping.id] || 0;
                    return (
                      <div
                        key={topping.id}
                        className="flex items-center justify-between p-4 glass-strong rounded-2xl"
                      >
                        <div className="flex-grow">
                          <h3 className="font-medium">{topping.name}</h3>
                          <p className="text-sm text-gray-600">
                            +${topping.price.toFixed(2)} • +{topping.calories} cal
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToppingChange(topping.id, -1)}
                            disabled={amount === 0}
                            className="w-8 h-8 rounded-full p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-6 text-center font-medium">{amount}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToppingChange(topping.id, 1)}
                            disabled={amount === 3}
                            className="w-8 h-8 rounded-full p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Sweetness & Ice Level */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0">
                <h2 className="text-2xl font-semibold mb-6">Customize Levels</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="font-medium">Sweetness</label>
                      <Badge variant="outline" className="rounded-full">
                        {sweetness[0]}%
                      </Badge>
                    </div>
                    <Slider
                      value={sweetness}
                      onValueChange={(value) => {
                        setSweetness(value);
                        calculateTotals(selectedBase, selectedToppings, value[0], iceLevel[0]);
                      }}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>No Sugar</span>
                      <span>Extra Sweet</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="font-medium">Ice Level</label>
                      <Badge variant="outline" className="rounded-full">
                        {iceLevel[0]}%
                      </Badge>
                    </div>
                    <Slider
                      value={iceLevel}
                      onValueChange={setIceLevel}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>No Ice</span>
                      <span>Extra Ice</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-8">
            {/* 3D Preview */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass neomorphic rounded-3xl p-8 border-0">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Box className="mr-3 w-6 h-6 text-[#7c9885]" />
                  3D Preview
                </h2>
                <div className="relative aspect-square bg-gradient-to-br from-[#f7f1e8] to-[#fefcf8] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotateY: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="relative w-48 h-48"
                    >
                      <ImageWithFallback
                        src={bases.find(b => b.id === selectedBase)?.image || ''}
                        alt="3D Preview"
                        className="w-full h-full object-cover rounded-2xl shadow-2xl"
                      />
                      {/* Toppings overlay */}
                      {Object.keys(selectedToppings).length > 0 && (
                        <div className="absolute inset-0 bg-gradient-to-t from-[#7c9885]/20 to-transparent rounded-2xl" />
                      )}
                    </motion.div>
                  </div>
                  
                  {/* AR Preview Button */}
                  <div className="absolute bottom-4 right-4">
                    <Button className="bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] text-white rounded-full px-4 py-2 hover:shadow-lg transition-all duration-300">
                      AR Preview
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Calorie Calculator */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0">
                <h2 className="text-xl font-semibold mb-4">Nutrition Info</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Calories</span>
                    <Badge className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white border-0">
                      {totalCalories} cal
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sweetness Impact</span>
                    <span className="text-sm text-gray-600">-{100 - sweetness[0]}% calories</span>
                  </div>
                  {Object.entries(selectedToppings).map(([toppingId, amount]) => {
                    const topping = toppings.find(t => t.id === toppingId);
                    return (
                      <div key={toppingId} className="flex justify-between items-center text-sm">
                        <span>{topping?.name} x{amount}</span>
                        <span>+{topping ? topping.calories * amount : 0} cal</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>{bases.find(b => b.id === selectedBase)?.name}</span>
                    <span>${bases.find(b => b.id === selectedBase)?.price.toFixed(2)}</span>
                  </div>
                  {Object.entries(selectedToppings).map(([toppingId, amount]) => {
                    const topping = toppings.find(t => t.id === toppingId);
                    return (
                      <div key={toppingId} className="flex justify-between text-sm">
                        <span>{topping?.name} x{amount}</span>
                        <span>+${topping ? (topping.price * amount).toFixed(2) : '0.00'}</span>
                      </div>
                    );
                  })}
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-[#7c9885]">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl py-3 hover:shadow-lg transition-all duration-300"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetCustomization}
                    className="w-full rounded-2xl py-3 flex items-center justify-center"
                  >
                    <RotateCcw className="mr-2 w-4 h-4" />
                    Reset
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}