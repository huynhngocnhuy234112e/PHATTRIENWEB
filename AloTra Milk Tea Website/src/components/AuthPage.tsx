import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, Facebook, Chrome, Apple } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface AuthPageProps {
  onPageChange: (page: string) => void;
  onAuthSuccess?: () => void;
  isModal?: boolean;
}

export function AuthPage({ onPageChange, onAuthSuccess, isModal = false }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  const handleAuth = async () => {
    setIsLoading(true);
    // Simulate auth process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    if (onAuthSuccess) {
      onAuthSuccess();
    } else {
      onPageChange('account');
    }
  };

  return (
    <div className={isModal ? "" : "pt-24 pb-16 min-h-screen flex items-center justify-center"}>
      <div className={isModal ? "w-full" : "max-w-md w-full mx-4"}>
        {/* Floating Bubble Animation - Only show on full page */}
        {!isModal && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-gradient-to-r from-[#7c9885]/30 to-[#f5a9bc]/30 rounded-full"
                initial={{
                  x: Math.random() * 400,
                  y: Math.random() * 600,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className={`${isModal ? "bg-transparent border-0 shadow-none p-0" : "glass-strong neomorphic rounded-3xl p-8 border-0"}`}>
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-matcha flex items-center justify-center"
              >
                <span className="text-white text-2xl font-bold">A</span>
              </motion.div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
                Welcome to AloTra
              </h1>
              <p className="text-gray-600 mt-2">Join our milk tea community</p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-2xl glass p-1 mb-6">
                <TabsTrigger 
                  value="login" 
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c9885] data-[state=active]:to-[#a4c4a8] data-[state=active]:text-white"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c9885] data-[state=active]:to-[#a4c4a8] data-[state=active]:text-white"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 rounded-2xl border-0 glass h-12"
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 rounded-2xl border-0 glass h-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-[#7c9885]" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="text-[#7c9885] hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    onClick={handleAuth}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl h-12 hover:shadow-lg transition-all duration-300"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </motion.div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Full name"
                      className="pl-10 rounded-2xl border-0 glass h-12"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      className="pl-10 rounded-2xl border-0 glass h-12"
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 rounded-2xl border-0 glass h-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-sm">
                        <span>Password strength</span>
                        <span className={`${
                          passwordStrength < 50 ? 'text-red-500' : 
                          passwordStrength < 75 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {passwordStrength < 50 ? 'Weak' : 
                           passwordStrength < 75 ? 'Medium' : 'Strong'}
                        </span>
                      </div>
                      <Progress 
                        value={passwordStrength} 
                        className="h-2"
                      />
                    </motion.div>
                  )}

                  <div className="text-sm text-gray-600">
                    <label className="flex items-start space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-[#7c9885] mt-0.5" />
                      <span>I agree to the <a href="#" className="text-[#7c9885] hover:underline">Terms of Service</a> and <a href="#" className="text-[#7c9885] hover:underline">Privacy Policy</a></span>
                    </label>
                  </div>

                  <Button
                    onClick={handleAuth}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl h-12 hover:shadow-lg transition-all duration-300"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </motion.div>
              </TabsContent>
            </Tabs>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { icon: Chrome, name: 'Google', color: 'from-red-500 to-yellow-500' },
                  { icon: Facebook, name: 'Facebook', color: 'from-blue-600 to-blue-700' },
                  { icon: Apple, name: 'Apple', color: 'from-gray-800 to-gray-900' }
                ].map((social, index) => (
                  <motion.button
                    key={social.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-2xl glass-strong hover:bg-gradient-to-r hover:${social.color} hover:text-white transition-all duration-300 flex items-center justify-center`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Success Animation */}
            {isLoading && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-3xl"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-16 h-16 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xl">🧋</span>
                </motion.div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}