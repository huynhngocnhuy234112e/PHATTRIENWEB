import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Heart, Award, Users, Globe, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

export function AboutPage({ onPageChange }: AboutPageProps) {
  const timeline = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Founded with a vision to revolutionize the milk tea experience',
      image: 'https://images.unsplash.com/photo-1611653682092-d881246b72a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU3ODE3OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      year: '2021',
      title: 'Sustainability Focus',
      description: 'Launched our zero-waste initiative and organic sourcing program',
      image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      year: '2022',
      title: 'Innovation Era',
      description: 'Introduced AI-powered customization and AR preview technology',
      image: 'https://images.unsplash.com/photo-1603898579713-fd8250f9f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvYmElMjB0ZWF8ZW58MXx8fHwxNzU3ODQ2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      year: '2023',
      title: 'Community Impact',
      description: 'Reached 1M+ customers and supported 500+ local farmers',
      image: 'https://images.unsplash.com/photo-1542338303-5c626b183494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMGRyaW5raW5nJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU2MHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Opening international locations while maintaining our core values',
      image: 'https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Every cup contributes to a healthier planet through our eco-friendly practices and organic ingredients.'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Building connections between customers, farmers, and local communities through fair trade and support.'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Premium ingredients and meticulous crafting ensure every drink meets our exceptional standards.'
    }
  ];

  const stats = [
    { number: '2M+', label: 'Happy Customers' },
    { number: '50+', label: 'Store Locations' },
    { number: '100%', label: 'Organic Ingredients' },
    { number: '500+', label: 'Farmers Supported' }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1611653682092-d881246b72a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU3ODE3OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Our Story"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>

        {/* Parallax Content */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white"
        >
          <div className="max-w-3xl">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Our Story of
              <span className="block bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
                Passion & Purpose
              </span>
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed"
            >
              From a small dream to a global movement, AloTra has been crafting exceptional 
              milk tea experiences while building a sustainable future for tea lovers worldwide.
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => onPageChange('menu')}
                className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl px-8 py-4 text-lg hover:shadow-2xl transition-all duration-300"
              >
                Taste Our Story
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-2xl px-8 py-4 text-lg"
              >
                Watch Our Journey
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f7f1e8] to-[#fefcf8]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every cup we craft
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className="glass neomorphic rounded-3xl p-8 border-0 text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Milestones that shaped our mission and fueled our passion for excellence
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-[#7c9885] to-[#f5a9bc] rounded-full" />
            
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="glass neomorphic rounded-3xl p-8 border-0"
                    >
                      <div className="text-3xl font-bold text-[#7c9885] mb-2">{item.year}</div>
                      <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] rounded-full z-10 shadow-lg" />
                  </div>
                  
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="aspect-video rounded-3xl overflow-hidden shadow-2xl"
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Impact by Numbers
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              The measurable difference we've made in our community and beyond
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                className="text-center"
              >
                <div className="glass-strong rounded-3xl p-8 backdrop-blur-xl">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 400 }}
                    className="text-4xl lg:text-5xl font-bold text-white mb-4"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-white/80 text-lg">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
              Behind the Scenes
            </h2>
            <p className="text-xl text-gray-600">
              See how we craft each cup with love and dedication to sustainability
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-3xl overflow-hidden glass neomorphic"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1542338303-5c626b183494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMGRyaW5raW5nJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU2MHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Behind the scenes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl"
              >
                <div className="w-0 h-0 border-l-[16px] border-l-[#7c9885] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f7f1e8] to-[#fefcf8]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
              Join Our Story
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Become part of our mission to create a more sustainable and delicious world, one cup at a time
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onPageChange('menu')}
                className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl px-8 py-4 text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Your Journey
              </Button>
              <Button
                onClick={() => onPageChange('contact')}
                variant="outline"
                className="border-2 border-[#7c9885] text-[#7c9885] hover:bg-[#7c9885] hover:text-white rounded-2xl px-8 py-4 text-lg transition-all duration-300"
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}