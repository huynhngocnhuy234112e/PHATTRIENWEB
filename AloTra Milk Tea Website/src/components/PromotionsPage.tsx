import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Gift, Star, MapPin, QrCode, Calendar, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PromotionsPageProps {
  onPageChange: (page: string) => void;
  onAddToCart: (product: any, requireAuth?: boolean) => void;
  isAuthenticated: boolean;
}

export function PromotionsPage({ onPageChange, onAddToCart, isAuthenticated }: PromotionsPageProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashSaleItems = [
    {
      id: 1,
      name: 'Matcha Supreme',
      originalPrice: 5.90,
      salePrice: 3.99,
      discount: 32,
      image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 67,
      maxStock: 100
    },
    {
      id: 2,
      name: 'Brown Sugar Delight',
      originalPrice: 6.50,
      salePrice: 4.50,
      discount: 31,
      image: 'https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 43,
      maxStock: 80
    },
    {
      id: 3,
      name: 'Tropical Passion',
      originalPrice: 5.20,
      salePrice: 3.50,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1603898579713-fd8250f9f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvYmElMjB0ZWF8ZW58MXx8fHwxNzU3ODQ2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 89,
      maxStock: 120
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tea Tasting Workshop',
      date: '2024-02-15',
      time: '2:00 PM - 4:00 PM',
      location: 'Downtown Flagship Store',
      description: 'Learn to identify different tea varieties and brewing techniques',
      image: 'https://images.unsplash.com/photo-1611653682092-d881246b72a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU3ODE3OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 25,
      spots: 8
    },
    {
      id: 2,
      title: 'Boba Making Class',
      date: '2024-02-20',
      time: '6:00 PM - 8:00 PM',
      location: 'University Campus Store',
      description: 'Master the art of making perfect boba pearls from scratch',
      image: 'https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      price: 35,
      spots: 3
    },
    {
      id: 3,
      title: 'Sustainability Fair',
      date: '2024-02-25',
      time: '10:00 AM - 6:00 PM',
      location: 'All Locations',
      description: 'Learn about our eco-friendly practices and try new sustainable products',
      image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 0,
      spots: 999
    }
  ];

  const loyaltyOffers = [
    {
      title: 'Double Points Weekend',
      description: 'Earn 2x reward points on all purchases',
      validUntil: '2024-02-18',
      tier: 'All Members'
    },
    {
      title: 'Gold Member Exclusive',
      description: '30% off premium toppings',
      validUntil: '2024-02-20',
      tier: 'Gold+'
    },
    {
      title: 'Platinum Perks',
      description: 'Free delivery + exclusive menu access',
      validUntil: '2024-02-28',
      tier: 'Platinum'
    }
  ];

  const createConfetti = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-gradient-to-r from-[#f5a9bc] to-[#7c9885] rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: -20,
          rotate: 0,
        }}
        animate={{
          y: window.innerHeight + 20,
          rotate: 360,
          x: Math.random() * window.innerWidth,
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          ease: 'linear',
          delay: Math.random() * 2,
        }}
      />
    ));
  };

  return (
    <div className="pt-24 pb-16 overflow-hidden">
      {/* Confetti Animation */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {createConfetti()}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
            Special Offers & Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss out on exclusive deals, limited-time offers, and exciting community events
          </p>
        </motion.div>

        {/* Flash Sale Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="glass neomorphic rounded-3xl p-8 border-0 bg-gradient-to-r from-red-50 to-orange-50">
            <div className="text-center mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center space-x-2 mb-4"
              >
                <Sparkles className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl lg:text-4xl font-bold text-red-600">Flash Sale</h2>
                <Sparkles className="w-8 h-8 text-red-500" />
              </motion.div>
              <p className="text-gray-600 mb-6">Limited time offer - Up to 35% off selected drinks!</p>
              
              {/* Countdown Timer */}
              <div className="flex justify-center space-x-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <motion.div
                    key={unit}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="glass-strong rounded-2xl p-4 min-w-[80px]"
                  >
                    <div className="text-2xl font-bold text-red-600">{value.toString().padStart(2, '0')}</div>
                    <div className="text-sm text-gray-600 capitalize">{unit}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {flashSaleItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="glass-strong rounded-3xl overflow-hidden border-0 hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-500 text-white border-0 animate-pulse">
                          -{item.discount}%
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-2xl font-bold text-red-600">${item.salePrice}</span>
                        <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Stock remaining</span>
                          <span>{item.stock} left</span>
                        </div>
                        <Progress value={(item.stock / item.maxStock) * 100} className="h-2" />
                      </div>
                      
                      <Button
                        onClick={() => onAddToCart({ ...item, price: item.salePrice }, true)}
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300"
                      >
                        {isAuthenticated ? `Add to Cart - Save ${(item.originalPrice - item.salePrice).toFixed(2)}` : 'Login to Add to Cart'}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upcoming Events */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass neomorphic rounded-3xl p-8 border-0">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <Calendar className="w-6 h-6 text-[#7c9885] mr-3" />
                Upcoming Events
              </h2>
              
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="glass-strong rounded-2xl p-6 hover:bg-white/50 transition-all duration-300"
                  >
                    <div className="flex space-x-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <Badge variant="outline" className="rounded-full">
                            {event.spots} spots left
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                        
                        <div className="space-y-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-bold text-[#7c9885]">
                            {event.price === 0 ? 'Free' : `$${event.price}`}
                          </span>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-xl border-2 border-gray-200 hover:border-[#7c9885]"
                            >
                              <QrCode className="w-4 h-4 mr-1" />
                              QR Code
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-xl"
                            >
                              Register
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Loyalty Offers */}
          <div className="space-y-8">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass neomorphic rounded-3xl p-8 border-0">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Gift className="w-6 h-6 text-[#f5a9bc] mr-3" />
                  Loyalty Member Perks
                </h2>
                
                <div className="space-y-4">
                  {loyaltyOffers.map((offer, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="glass-strong rounded-2xl p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold">{offer.title}</h3>
                        <Badge className="bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] text-white border-0">
                          {offer.tier}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Valid until {offer.validUntil}</span>
                        <Button size="sm" variant="outline" className="rounded-xl">
                          Claim Now
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <Button
                    onClick={() => onPageChange('account')}
                    className="bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] text-white rounded-2xl px-6"
                  >
                    View My Rewards
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* QR Code Participation */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass neomorphic rounded-3xl p-8 border-0 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Scan & Win</h3>
                <p className="text-gray-600 mb-6">
                  Scan QR codes at our stores to participate in daily giveaways and earn bonus points!
                </p>
                
                {/* Mock QR Code */}
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${
                          Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                        } rounded-sm`}
                      />
                    ))}
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl px-6">
                  Download QR Scanner
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="glass neomorphic rounded-3xl p-12 border-0 bg-gradient-to-r from-[#7c9885]/10 to-[#f5a9bc]/10">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] flex items-center justify-center"
            >
              <Star className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
              Never Miss a Deal
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our exclusive community to get notified about flash sales, new promotions, and special events
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onPageChange('auth')}
                className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl px-8 py-4 text-lg"
              >
                Join Loyalty Program
              </Button>
              <Button
                onClick={() => onPageChange('menu')}
                variant="outline"
                className="border-2 border-[#7c9885] text-[#7c9885] hover:bg-[#7c9885] hover:text-white rounded-2xl px-8 py-4 text-lg"
              >
                Shop Now
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}