import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Heart, Gift, Settings, History, Star, Award, Coffee, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AccountPageProps {
  onPageChange: (page: string) => void;
}

export function AccountPage({ onPageChange }: AccountPageProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock user data
  const userData = {
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    avatar: 'https://images.unsplash.com/photo-1542338303-5c626b183494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMGRyaW5raW5nJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    memberSince: '2023',
    totalOrders: 47,
    rewardPoints: 1250,
    favoriteCategories: ['Matcha', 'Brown Sugar', 'Fruit Tea'],
    loyaltyTier: 'Gold'
  };

  const orderHistory = [
    { id: '#ORD-001', date: '2024-01-15', items: 'Matcha Supreme, Brown Sugar Delight', total: 12.40, status: 'Delivered' },
    { id: '#ORD-002', date: '2024-01-12', items: 'Classic Milk Tea, Extra Pearls', total: 8.30, status: 'Delivered' },
    { id: '#ORD-003', date: '2024-01-10', items: 'Tropical Passion', total: 5.20, status: 'Delivered' },
    { id: '#ORD-004', date: '2024-01-08', items: 'Taro Cloud, Honey Pearls', total: 9.60, status: 'Delivered' },
    { id: '#ORD-005', date: '2024-01-05', items: 'Earl Grey Elegance', total: 5.40, status: 'Delivered' }
  ];

  const wishlistItems = [
    { id: 1, name: 'Strawberry Cream', price: 6.20, image: 'https://images.unsplash.com/photo-1603898579713-fd8250f9f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJvYmElMjB0ZWF8ZW58MXx8fHwxNzU3ODQ2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 2, name: 'Chocolate Indulgence', price: 7.50, image: 'https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwYnViYmxlJTIwdGVhfGVufDF8fHx8MTc1Nzg0NjU1MXww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 3, name: 'Lavender Dreams', price: 5.80, image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYXxlbnwxfHx8fDE3NTc3Njc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080' }
  ];

  // Chart data
  const monthlySpending = [
    { month: 'Aug', amount: 45 },
    { month: 'Sep', amount: 52 },
    { month: 'Oct', amount: 38 },
    { month: 'Nov', amount: 67 },
    { month: 'Dec', amount: 84 },
    { month: 'Jan', amount: 91 }
  ];

  const drinkPreferences = [
    { name: 'Matcha', value: 35, color: '#7c9885' },
    { name: 'Brown Sugar', value: 25, color: '#f5a9bc' },
    { name: 'Fruit Tea', value: 20, color: '#f7f1e8' },
    { name: 'Classic', value: 15, color: '#8d7d6b' },
    { name: 'Others', value: 5, color: '#f5d0c8' }
  ];

  const loyaltyProgress = (userData.rewardPoints % 500) / 500 * 100;
  const pointsToNextTier = 500 - (userData.rewardPoints % 500);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <Card className="glass neomorphic rounded-3xl p-8 border-0">
            <div className="flex items-center space-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </motion.div>
              
              <div className="flex-grow">
                <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                <p className="text-gray-600 mb-4">{userData.email}</p>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white border-0">
                    {userData.loyaltyTier} Member
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Member since {userData.memberSince}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-[#7c9885] mb-1">
                  {userData.rewardPoints}
                </div>
                <div className="text-sm text-gray-600">Reward Points</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-[#f5a9bc] mb-1">
                  {userData.totalOrders}
                </div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
            </div>
          </Card>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="glass neomorphic rounded-2xl p-2 inline-flex">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c9885] data-[state=active]:to-[#a4c4a8] data-[state=active]:text-white"
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="orders"
              className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c9885] data-[state=active]:to-[#a4c4a8] data-[state=active]:text-white"
            >
              <History className="w-4 h-4" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger 
              value="wishlist"
              className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c9885] data-[state=active]:to-[#a4c4a8] data-[state=active]:text-white"
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </TabsTrigger>
            <TabsTrigger 
              value="rewards"
              className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c9885] data-[state=active]:to-[#a4c4a8] data-[state=active]:text-white"
            >
              <Gift className="w-4 h-4" />
              <span>Rewards</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c9885] data-[state=active]:to-[#a4c4a8] data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Stats Cards */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: Coffee, label: 'Favorite Drink', value: 'Matcha Supreme', color: 'from-[#7c9885] to-[#a4c4a8]' },
                    { icon: Calendar, label: 'Last Order', value: '3 days ago', color: 'from-[#f5a9bc] to-[#f8c8d4]' },
                    { icon: Star, label: 'Average Rating', value: '4.9/5', color: 'from-[#8d7d6b] to-[#a69080]' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass neomorphic rounded-3xl p-6 border-0">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">{stat.label}</h3>
                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Spending Chart */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="glass neomorphic rounded-3xl p-6 border-0">
                    <h3 className="text-xl font-semibold mb-6">Monthly Spending</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlySpending}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(124, 152, 133, 0.1)" />
                          <XAxis dataKey="month" stroke="#6b6560" />
                          <YAxis stroke="#6b6560" />
                          <Tooltip 
                            contentStyle={{ 
                              background: 'var(--glass-bg)', 
                              border: '1px solid var(--glass-border)',
                              borderRadius: '16px',
                              backdropFilter: 'blur(20px)'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="amount" 
                            stroke="#7c9885" 
                            strokeWidth={3}
                            dot={{ fill: '#7c9885', strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8, stroke: '#f5a9bc', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Drink Preferences & Loyalty */}
              <div className="space-y-8">
                {/* Loyalty Progress */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass neomorphic rounded-3xl p-6 border-0">
                    <h3 className="text-xl font-semibold mb-6">Loyalty Progress</h3>
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-[#7c9885] mb-2">
                        {userData.loyaltyTier}
                      </div>
                      <p className="text-gray-600">Current Tier</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress to next tier</span>
                        <span>{Math.round(loyaltyProgress)}%</span>
                      </div>
                      <Progress value={loyaltyProgress} className="h-3" />
                      <p className="text-sm text-gray-600 text-center">
                        {pointsToNextTier} points to reach Platinum
                      </p>
                    </div>
                  </Card>
                </motion.div>

                {/* Drink Preferences */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass neomorphic rounded-3xl p-6 border-0">
                    <h3 className="text-xl font-semibold mb-6">Drink Preferences</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={drinkPreferences}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {drinkPreferences.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {drinkPreferences.map((pref, index) => (
                        <div key={pref.name} className="flex items-center space-x-2 text-sm">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: pref.color }}
                          />
                          <span>{pref.name}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Card className="glass neomorphic rounded-3xl border-0 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-semibold">Order History</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {orderHistory.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-4">
                            <span className="font-semibold text-[#7c9885]">{order.id}</span>
                            <Badge variant="outline" className="rounded-full">
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{order.items}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-800 mb-2">
                            ${order.total.toFixed(2)}
                          </div>
                          <Button variant="outline" size="sm" className="rounded-xl">
                            Reorder
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="glass neomorphic rounded-3xl overflow-hidden border-0">
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute top-4 right-4 p-2 rounded-full glass-strong hover:bg-red-500 hover:text-white transition-all">
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-[#7c9885]">
                          ${item.price.toFixed(2)}
                        </span>
                        <Button 
                          onClick={() => onPageChange('menu')}
                          className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-xl"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center"
            >
              <Card className="glass neomorphic rounded-3xl p-8 border-0 max-w-2xl mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] flex items-center justify-center">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Rewards Center</h2>
                <p className="text-gray-600 mb-8">
                  Your current balance: <span className="font-bold text-[#7c9885]">{userData.rewardPoints} points</span>
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: 'Free Drink', points: 500, description: 'Any regular-sized drink' },
                    { title: '20% Off', points: 200, description: 'On your next order' },
                    { title: 'Extra Toppings', points: 100, description: 'Free toppings upgrade' },
                    { title: 'Birthday Special', points: 1000, description: 'Special birthday combo' }
                  ].map((reward, index) => (
                    <motion.div
                      key={reward.title}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-strong rounded-2xl p-6 text-center"
                    >
                      <h3 className="font-semibold mb-2">{reward.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                      <div className="text-2xl font-bold text-[#f5a9bc] mb-4">
                        {reward.points} pts
                      </div>
                      <Button
                        disabled={userData.rewardPoints < reward.points}
                        className="w-full bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-xl disabled:opacity-50"
                      >
                        Redeem
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Card className="glass neomorphic rounded-3xl p-8 border-0">
                <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
                <div className="space-y-6">
                  {[
                    'Edit Profile Information',
                    'Notification Preferences',
                    'Payment Methods',
                    'Delivery Addresses',
                    'Privacy Settings',
                    'Help & Support'
                  ].map((setting, index) => (
                    <motion.div
                      key={setting}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 glass-strong rounded-2xl hover:bg-white/50 transition-colors cursor-pointer"
                    >
                      <span>{setting}</span>
                      <div className="w-6 h-6 rounded-full bg-gray-200" />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}