import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Smartphone, QrCode, MapPin, User, Mail, Phone, Lock, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface CheckoutPageProps {
  cartItems: any[];
  onPageChange: (page: string) => void;
}

export function CheckoutPage({ cartItems, onPageChange }: CheckoutPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    savePayment: false
  });
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const delivery = 3.99;
  const total = subtotal + tax + delivery;

  const steps = [
    { id: 1, title: 'Information', description: 'Contact & delivery details' },
    { id: 2, title: 'Payment', description: 'Choose payment method' },
    { id: 3, title: 'Confirmation', description: 'Review your order' }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'momo', name: 'MoMo Wallet', icon: Smartphone, description: 'Pay with MoMo e-wallet' },
    { id: 'zalopay', name: 'ZaloPay', icon: Smartphone, description: 'ZaloPay digital wallet' },
    { id: 'qr', name: 'QR Code', icon: QrCode, description: 'Scan to pay instantly' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Process order
      setOrderComplete(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (orderComplete) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="max-w-md w-full mx-4 text-center"
        >
          <Card className="glass-strong neomorphic rounded-3xl p-8 border-0">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-4 text-green-600"
            >
              Order Confirmed!
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-6"
            >
              Thank you for your order! We're preparing your drinks with love and care.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="glass rounded-2xl p-4">
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="font-bold text-lg">#ALO-{Date.now().toString().slice(-6)}</p>
              </div>
              
              <div className="glass rounded-2xl p-4">
                <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                <p className="font-semibold">15-25 minutes</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 mt-8"
            >
              <Button
                onClick={() => onPageChange('account')}
                className="w-full bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl h-12"
              >
                Track Your Order
              </Button>
              <Button
                onClick={() => onPageChange('home')}
                variant="outline"
                className="w-full rounded-2xl h-12"
              >
                Continue Shopping
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    );
  }

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
            Checkout
          </h1>
          <p className="text-xl text-gray-600">
            Almost there! Complete your order below
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white shadow-lg'
                        : 'glass text-gray-400'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <div className={`font-medium ${currentStep >= step.id ? 'text-[#7c9885]' : 'text-gray-400'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-4 rounded-full transition-all duration-300 ${
                      currentStep > step.id ? 'bg-[#7c9885]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass neomorphic rounded-3xl p-8 border-0">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Contact Information</h2>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John"
                            className="pl-10 rounded-2xl border-0 glass h-12"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="rounded-2xl border-0 glass h-12"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="pl-10 rounded-2xl border-0 glass h-12"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                          className="pl-10 rounded-2xl border-0 glass h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Delivery Address</h3>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Street Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="123 Main Street"
                            className="pl-10 rounded-2xl border-0 glass h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">City</label>
                          <Input
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="New York"
                            className="rounded-2xl border-0 glass h-12"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">ZIP Code</label>
                          <Input
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            placeholder="10001"
                            className="rounded-2xl border-0 glass h-12"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Payment Method</h2>
                    
                    <Tabs value={formData.paymentMethod} onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
                      <TabsList className="glass rounded-2xl p-2 grid grid-cols-2 lg:grid-cols-4 w-full">
                        {paymentMethods.map((method) => (
                          <TabsTrigger
                            key={method.id}
                            value={method.id}
                            className="flex flex-col items-center space-y-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7c9885] data-[state=active]:to-[#a4c4a8] data-[state=active]:text-white p-3"
                          >
                            <method.icon className="w-5 h-5" />
                            <span className="text-xs">{method.name}</span>
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      <TabsContent value="card" className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Card Number</label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234 5678 9012 3456"
                              className="pl-10 rounded-2xl border-0 glass h-12"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Expiry Date</label>
                            <Input
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              className="rounded-2xl border-0 glass h-12"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CVV</label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                className="pl-10 rounded-2xl border-0 glass h-12"
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="momo" className="text-center py-8">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                          <Smartphone className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">MoMo Wallet</h3>
                        <p className="text-gray-600 mb-4">You'll be redirected to MoMo to complete payment</p>
                        <Badge className="bg-pink-100 text-pink-800 border-0">
                          Secure & Fast Payment
                        </Badge>
                      </TabsContent>

                      <TabsContent value="zalopay" className="text-center py-8">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                          <Smartphone className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">ZaloPay</h3>
                        <p className="text-gray-600 mb-4">Quick payment with ZaloPay digital wallet</p>
                        <Badge className="bg-blue-100 text-blue-800 border-0">
                          Instant Transfer
                        </Badge>
                      </TabsContent>

                      <TabsContent value="qr" className="text-center py-8">
                        <div className="w-32 h-32 mx-auto mb-4 glass rounded-2xl flex items-center justify-center">
                          <QrCode className="w-16 h-16 text-[#7c9885]" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Scan QR Code</h3>
                        <p className="text-gray-600 mb-4">Use any banking app to scan and pay</p>
                        <Badge className="bg-green-100 text-green-800 border-0">
                          No App Required
                        </Badge>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Order Confirmation</h2>
                    
                    <div className="space-y-4">
                      <div className="glass rounded-2xl p-4">
                        <h3 className="font-semibold mb-2">Delivery Information</h3>
                        <p className="text-sm text-gray-600">
                          {formData.firstName} {formData.lastName}<br />
                          {formData.address}<br />
                          {formData.city}, {formData.zipCode}<br />
                          {formData.phone}
                        </p>
                      </div>

                      <div className="glass rounded-2xl p-4">
                        <h3 className="font-semibold mb-2">Payment Method</h3>
                        <div className="flex items-center space-x-2">
                          {(() => {
                            const method = paymentMethods.find(m => m.id === formData.paymentMethod);
                            return method ? (
                              <>
                                <method.icon className="w-5 h-5" />
                                <span>{method.name}</span>
                              </>
                            ) : null;
                          })()}
                        </div>
                      </div>

                      <div className="glass rounded-2xl p-4">
                        <h3 className="font-semibold mb-2">Estimated Delivery</h3>
                        <p className="text-[#7c9885] font-medium">15-25 minutes</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t">
                  {currentStep > 1 ? (
                    <Button
                      variant="outline"
                      onClick={handlePreviousStep}
                      className="rounded-2xl px-6"
                    >
                      Previous
                    </Button>
                  ) : (
                    <div />
                  )}
                  
                  <Button
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-[#7c9885] to-[#a4c4a8] text-white rounded-2xl px-8"
                  >
                    {currentStep === 3 ? 'Complete Order' : 'Continue'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass neomorphic rounded-3xl p-6 border-0 sticky top-24">
                <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>${delivery.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                    <span>Total</span>
                    <span className="text-[#7c9885]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 glass rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-green-600">
                      Express Delivery Available
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Your order will be prepared fresh and delivered in 15-25 minutes
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}