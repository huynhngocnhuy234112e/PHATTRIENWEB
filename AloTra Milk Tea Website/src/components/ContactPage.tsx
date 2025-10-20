import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface ContactPageProps {
  onPageChange: (page: string) => void;
}

export function ContactPage({ onPageChange }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showChatbot, setShowChatbot] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Tea Street, Beverage District', 'City Center, TC 12345'],
      color: 'from-[#7c9885] to-[#a4c4a8]'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', 'Mon-Fri: 9AM-8PM'],
      color: 'from-[#f5a9bc] to-[#f8c8d4]'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@alotra.com', 'support@alotra.com'],
      color: 'from-[#8d7d6b] to-[#a69080]'
    },
    {
      icon: Clock,
      title: 'Store Hours',
      details: ['Mon-Thu: 7AM-10PM', 'Fri-Sun: 7AM-11PM'],
      color: 'from-[#f5d0c8] to-[#f7d6d0]'
    }
  ];

  const locations = [
    { name: 'Downtown Flagship', address: '123 Tea Street', hours: '7AM-11PM', status: 'Open' },
    { name: 'University Campus', address: '456 Campus Ave', hours: '6AM-12AM', status: 'Open' },
    { name: 'Shopping Mall', address: '789 Mall Blvd', hours: '10AM-10PM', status: 'Open' },
    { name: 'Business District', address: '321 Office Plaza', hours: '7AM-8PM', status: 'Closed' }
  ];

  const faqItems = [
    {
      question: 'What are your most popular drinks?',
      answer: 'Our bestsellers include Matcha Supreme, Brown Sugar Delight, and Classic Milk Tea with boba pearls!'
    },
    {
      question: 'Do you offer vegan options?',
      answer: 'Yes! We have many plant-based milk alternatives including oat, almond, and coconut milk.'
    },
    {
      question: 'Can I customize my drink?',
      answer: 'Absolutely! Use our customize page to create your perfect blend with various toppings and sweetness levels.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out with questions, feedback, or just to say hello
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0 text-center h-full">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass neomorphic rounded-3xl p-8 border-0">
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="rounded-2xl border-0 glass h-12"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="rounded-2xl border-0 glass h-12"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="rounded-2xl border-0 glass h-12"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more..."
                    rows={6}
                    className="rounded-2xl border-0 glass resize-none"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl h-12 hover:shadow-lg transition-all duration-300"
                >
                  <Send className="mr-2 w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Map & Live Chat */}
          <div className="space-y-8">
            {/* Interactive Map */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass neomorphic rounded-3xl p-8 border-0">
                <h2 className="text-2xl font-semibold mb-6">Find Our Stores</h2>
                <div className="aspect-video bg-gradient-to-br from-[#f7f1e8] to-[#fefcf8] rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                  {/* Mock Map */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7c9885]/20 to-[#f5a9bc]/20">
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-4 h-4 bg-[#f5a9bc] rounded-full shadow-lg"
                      />
                    </div>
                    <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="w-4 h-4 bg-[#7c9885] rounded-full shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="text-center z-10">
                    <MapPin className="w-12 h-12 text-[#7c9885] mx-auto mb-2" />
                    <p className="text-gray-600">Interactive Map</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {locations.map((location, index) => (
                    <motion.div
                      key={location.name}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center justify-between p-3 glass-strong rounded-xl"
                    >
                      <div>
                        <h4 className="font-medium">{location.name}</h4>
                        <p className="text-sm text-gray-600">{location.address}</p>
                        <p className="text-sm text-gray-500">{location.hours}</p>
                      </div>
                      <Badge
                        className={`${
                          location.status === 'Open'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        } border-0`}
                      >
                        {location.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Live Chat */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass neomorphic rounded-3xl p-8 border-0">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Live Chat Support</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                    <div className="glass-strong rounded-2xl p-3 max-w-xs">
                      <p className="text-sm">Hi! I'm AloBot. How can I help you today? 😊</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] rounded-2xl p-3 max-w-xs">
                      <p className="text-sm text-white">Hello! I'd like to know more about your sustainability practices.</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">👤</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                    <div className="glass-strong rounded-2xl p-3 max-w-xs">
                      <p className="text-sm">Great question! We're committed to 100% organic ingredients and zero-waste packaging. Would you like to learn more about our sustainability initiatives?</p>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={() => setShowChatbot(!showChatbot)}
                  className="w-full bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] text-white rounded-2xl h-12 hover:shadow-lg transition-all duration-300"
                >
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Start Live Chat
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="glass neomorphic rounded-3xl p-8 border-0">
            <h2 className="text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-strong rounded-2xl p-6"
                >
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Star className="w-5 h-5 text-[#f5a9bc] mr-2" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button
                onClick={() => onPageChange('blog')}
                variant="outline"
                className="border-2 border-[#7c9885] text-[#7c9885] hover:bg-[#7c9885] hover:text-white rounded-2xl px-6"
              >
                View More FAQs
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Floating Chat Button */}
      {!showChatbot && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-6 left-6 w-16 h-16 bg-gradient-to-r from-[#f5a9bc] to-[#f8c8d4] rounded-full shadow-2xl flex items-center justify-center z-50"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </motion.button>
      )}

      {/* Chatbot Modal */}
      {showChatbot && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 left-6 w-80 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span>🤖</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">AloBot</h3>
                <p className="text-white/80 text-sm">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            <div className="space-y-4">
              <div className="glass-strong rounded-2xl p-3">
                <p className="text-sm">Welcome! I'm here to help with any questions about our drinks, locations, or services. What would you like to know?</p>
              </div>
              
              <div className="space-y-2">
                {['Store locations', 'Menu recommendations', 'Nutritional info', 'Order status'].map((option) => (
                  <button
                    key={option}
                    className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                className="flex-grow rounded-xl border-0 glass text-sm"
              />
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-xl px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}