import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Trash2, Tag, MapPin, Clock, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartPageProps {
  cartItems: any[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onPageChange: (page: string) => void;
}

export function CartPage({ cartItems, onUpdateQuantity, onRemoveItem, onPageChange }: CartPageProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [location, setLocation] = useState('Downtown');
  const [showUpsell, setShowUpsell] = useState(true);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? subtotal * 0.1 : 0;
  const shippingFee = location === 'Downtown' ? 2.99 : location === 'Suburbs' ? 4.99 : 6.99;
  const total = subtotal - discount + shippingFee;

  const coupons = {
    'WELCOME10': { discount: 0.1, description: '10% off your order' },
    'FIRST20': { discount: 0.2, description: '20% off first order' },
    'STUDENT15': { discount: 0.15, description: '15% student discount' }
  };

  const upsellToppings = [
    { id: 'extra-pearls', name: 'Extra Boba Pearls', price: 0.80, image: 'https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 'cheese-foam', name: 'Cheese Foam', price: 1.50, image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 'pudding', name: 'Creamy Pudding', price: 1.20, image: 'https://images.unsplash.com/photo-1603898579713-fd8250f9f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvYmElMjB0ZWF8ZW58MXx8fHwxNzU3ODQ2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080' }
  ];

  const handleCouponApply = () => {
    if (coupons[couponCode as keyof typeof coupons]) {
      setAppliedCoupon(couponCode);
      setCouponCode('');
    }
  };

  const progressToFreeShipping = Math.min((subtotal / 25) * 100, 100);
  const freeShippingRemaining = Math.max(25 - subtotal, 0);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
            Your Cart
          </h1>
          <p className="text-xl text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready to brew
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 mx-auto mb-8 glass rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any drinks yet</p>
            <Button
              onClick={() => onPageChange('menu')}
              className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl px-8 py-3"
            >
              Browse Menu
            </Button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Free Shipping Progress */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Card className="glass neomorphic rounded-3xl p-6 border-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-[#7c9885]" />
                      <span className="font-medium">Free Shipping Progress</span>
                    </div>
                    <Badge className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white border-0">
                      ${subtotal.toFixed(2)} / $25.00
                    </Badge>
                  </div>
                  <Progress value={progressToFreeShipping} className="mb-2" />
                  <p className="text-sm text-gray-600">
                    {freeShippingRemaining > 0 
                      ? `Add $${freeShippingRemaining.toFixed(2)} more for free shipping!` 
                      : 'You qualify for free shipping! 🎉'
                    }
                  </p>
                </Card>
              </motion.div>

              {/* Cart Items List */}
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass neomorphic rounded-3xl p-6 border-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow space-y-2">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          {item.customization && (
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>Sweetness: {item.customization.sweetness}%</p>
                              <p>Ice: {item.customization.iceLevel}%</p>
                              {Object.keys(item.customization.toppings).length > 0 && (
                                <p>Toppings: {Object.keys(item.customization.toppings).join(', ')}</p>
                              )}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 rounded-full p-0"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full p-0"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <span className="text-xl font-bold text-[#7c9885]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Upsell Toppings */}
              {showUpsell && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass neomorphic rounded-3xl p-6 border-0 relative">
                    <button
                      onClick={() => setShowUpsell(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                    <div className="flex items-center mb-4">
                      <Sparkles className="w-5 h-5 text-[#f5a9bc] mr-2" />
                      <h3 className="font-semibold">Make it even better!</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Add these popular toppings to enhance your drinks</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      {upsellToppings.map((topping) => (
                        <motion.div
                          key={topping.id}
                          whileHover={{ scale: 1.05 }}
                          className="glass-strong rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg transition-all duration-300"
                        >
                          <div className="w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden">
                            <ImageWithFallback
                              src={topping.image}
                              alt={topping.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="font-medium mb-1">{topping.name}</h4>
                          <p className="text-sm text-[#7c9885] font-semibold">+${topping.price}</p>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Location Selector */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass neomorphic rounded-3xl p-6 border-0">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-[#7c9885] mr-2" />
                    Delivery Location
                  </h3>
                  <div className="space-y-3">
                    {['Downtown', 'Suburbs', 'Outside City'].map((loc) => (
                      <label key={loc} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="location"
                          value={loc}
                          checked={location === loc}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-4 h-4 text-[#7c9885]"
                        />
                        <span>{loc}</span>
                        <span className="text-sm text-gray-500 ml-auto">
                          ${loc === 'Downtown' ? '2.99' : loc === 'Suburbs' ? '4.99' : '6.99'}
                        </span>
                      </label>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Coupon Code */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="glass neomorphic rounded-3xl p-6 border-0">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Tag className="w-5 h-5 text-[#f5a9bc] mr-2" />
                    Promo Code
                  </h3>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-500 text-white border-0">{appliedCoupon}</Badge>
                        <span className="text-sm text-green-700">
                          {coupons[appliedCoupon as keyof typeof coupons]?.description}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAppliedCoupon(null)}
                        className="text-green-700 hover:text-green-900"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter promo code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-grow rounded-xl border-0 glass"
                      />
                      <Button
                        onClick={handleCouponApply}
                        disabled={!couponCode}
                        className="bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] text-white rounded-xl"
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                  <div className="mt-3 text-xs text-gray-500">
                    Try: WELCOME10, FIRST20, STUDENT15
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
                  <h3 className="font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shippingFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-[#7c9885]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => onPageChange('checkout')}
                    className="w-full mt-6 bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl py-3 hover:shadow-lg transition-all duration-300"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => onPageChange('menu')}
                    className="w-full mt-3 rounded-2xl py-3"
                  >
                    Continue Shopping
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}