import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Play, ArrowRight, Leaf, Heart, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Crafted with Love",
      subtitle: "Premium Milk Tea Experience",
      description: "Discover our signature blend of traditional tea with modern flavors",
      image: "https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080",
      cta: "Customize Your Tea"
    },
    {
      title: "Fresh & Natural",
      subtitle: "Sustainable Ingredients",
      description: "Made with organic tea leaves and fresh, locally-sourced ingredients",
      image: "https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      cta: "Explore Menu"
    },
    {
      title: "Infinite Flavors",
      subtitle: "Your Perfect Blend",
      description: "Mix and match from over 100 combinations to create your signature drink",
      image: "https://images.unsplash.com/photo-1603898579713-fd8250f9f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvYmElMjB0ZWF8ZW58MXx8fHwxNzU3ODQ2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      cta: "Start Creating"
    }
  ];

  const recommendedDrinks = [
    { name: "Matcha Dream", price: "$5.90", rating: 4.8, image: "https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { name: "Brown Sugar Bliss", price: "$6.50", rating: 4.9, image: "https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080" },
    { name: "Tropical Passion", price: "$5.20", rating: 4.7, image: "https://images.unsplash.com/photo-1603898579713-fd8250f9f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvYmElMjB0ZWF8ZW58MXx8fHwxNzU3ODQ2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      rating: 5,
      comment: "The best milk tea I've ever had! The customization options are incredible.",
      avatar: "https://images.unsplash.com/photo-1542338303-5c626b183494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMGRyaW5raW5nJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU2MHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Marcus Johnson",
      rating: 5,
      comment: "Love the sustainability focus. Great taste with a clear conscience!",
      avatar: "https://images.unsplash.com/photo-1542338303-5c626b183494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMGRyaW5raW5nJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU2MHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Emily Zhang",
      rating: 5,
      comment: "The AR preview feature is amazing! I can see exactly what I'm ordering.",
      avatar: "https://images.unsplash.com/photo-1542338303-5c626b183494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMGRyaW5raW5nJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU2MHww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="pt-16">
      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1
            }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                          {slide.title}
                        </h1>
                        <h2 className="text-2xl lg:text-3xl text-[#f5a9bc] font-medium">
                          {slide.subtitle}
                        </h2>
                        <p className="text-xl text-white/90 max-w-lg">
                          {slide.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={() => onPageChange('customize')}
                          className="group px-8 py-3 bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] hover:from-[#6b8470] hover:to-[#8db391] text-white rounded-2xl transition-all duration-300 transform hover:scale-105"
                        >
                          {slide.cta}
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => onPageChange('menu')}
                          className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-2xl transition-all duration-300"
                        >
                          View Menu
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full glass-strong hover:bg-white/30 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full glass-strong hover:bg-white/30 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </section>

      {/* Personalized Recommendations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
              Just for You
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Based on your preferences, here are some drinks we think you'll love
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {recommendedDrinks.map((drink, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="glass neomorphic rounded-3xl overflow-hidden border-0 hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64">
                    <ImageWithFallback
                      src={drink.image}
                      alt={drink.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{drink.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{drink.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#7c9885]">{drink.price}</span>
                      <Button
                        onClick={() => onPageChange('product')}
                        className="bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] hover:from-[#f299b1] hover:to-[#f6bcc9] text-white rounded-xl"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f7f1e8] to-[#fefcf8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                  Sip with Purpose
                </h2>
                <p className="text-xl text-gray-600">
                  Every cup contributes to a more sustainable future. Our commitment goes beyond great taste.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-[#7c9885]/10">
                    <Leaf className="w-6 h-6 text-[#7c9885]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">100% Organic Ingredients</h3>
                    <p className="text-gray-600">Sourced directly from certified organic farms with fair trade practices.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-[#f5a9bc]/10">
                    <Heart className="w-6 h-6 text-[#f5a9bc]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Community Impact</h3>
                    <p className="text-gray-600">Every purchase supports local farmers and education programs.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-[#8d7d6b]/10">
                    <Award className="w-6 h-6 text-[#8d7d6b]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Zero Waste Goal</h3>
                    <p className="text-gray-600">Biodegradable packaging and comprehensive recycling programs.</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => onPageChange('about')}
                className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl px-8 py-3 hover:shadow-lg transition-all duration-300"
              >
                Learn More About Our Mission
              </Button>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden neomorphic">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1611653682092-d881246b72a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU3ODE3OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Sustainable cafe interior"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from real customers who love their AloTra experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass neomorphic rounded-3xl p-8 border-0 h-full">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <ImageWithFallback
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white">
              Ready to Create Your Perfect Cup?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Experience the future of milk tea with our AI-powered customization and AR preview
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onPageChange('customize')}
                className="bg-white text-[#7c9885] hover:bg-gray-100 rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Customize Your Milk Tea
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#7c9885] rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch AR Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}