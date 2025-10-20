import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';

// Import all page components
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { MenuPage } from './components/MenuPage';
import { CustomizePage } from './components/CustomizePage';
import { CartPage } from './components/CartPage';

// Additional page components (simplified for demo)
import { AuthPage } from './components/AuthPage';
import { AccountPage } from './components/AccountPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { BlogPage } from './components/BlogPage';
import { PromotionsPage } from './components/PromotionsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAddToCart = (product: any) => {
    const existingItem = cartItems.find(item => 
      item.id === product.id && 
      JSON.stringify(item.customization) === JSON.stringify(product.customization)
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === existingItem.id && 
        JSON.stringify(item.customization) === JSON.stringify(existingItem.customization)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    // Animated toast notification
    toast.success('Added to cart!', {
      description: `${product.name} has been added to your cart`,
      action: {
        label: 'View Cart',
        onClick: () => setCurrentPage('cart'),
      },
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.info('Item removed from cart');
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    toast.success('Welcome back!', {
      description: 'You have successfully logged in',
    });
  };

  const handleAddToCartWithAuth = (product: any, requireAuth = false) => {
    if (requireAuth && !isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    handleAddToCart(product);
  };

  const renderPage = () => {
    const pageProps = {
      onPageChange: setCurrentPage,
      onAddToCart: handleAddToCart,
      onAddToCartWithAuth: handleAddToCartWithAuth,
      cartItems,
      onUpdateQuantity: handleUpdateQuantity,
      onRemoveItem: handleRemoveItem,
      isAuthenticated,
      onShowAuthModal: () => setShowAuthModal(true)
    };

    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'menu':
        return <MenuPage onPageChange={setCurrentPage} onAddToCart={handleAddToCart} isAuthenticated={isAuthenticated} onShowAuthModal={() => setShowAuthModal(true)} />;
      case 'customize':
        return <CustomizePage onAddToCart={handleAddToCart} />;
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onPageChange={setCurrentPage}
          />
        );
      case 'product':
        return <ProductDetailPage {...pageProps} isAuthenticated={isAuthenticated} onShowAuthModal={() => setShowAuthModal(true)} />;
      case 'checkout':
        return <CheckoutPage {...pageProps} />;
      case 'auth':
        return <AuthPage onPageChange={setCurrentPage} onAuthSuccess={handleAuthSuccess} />;
      case 'account':
        return <AccountPage onPageChange={setCurrentPage} />;
      case 'about':
        return <AboutPage onPageChange={setCurrentPage} />;
      case 'contact':
        return <ContactPage onPageChange={setCurrentPage} />;
      case 'blog':
        return <BlogPage onPageChange={setCurrentPage} />;
      case 'promotions':
        return <PromotionsPage onPageChange={setCurrentPage} onAddToCart={handleAddToCartWithAuth} isAuthenticated={isAuthenticated} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        cartItems={totalCartItems}
      />

      {/* Page Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Floating Add to Cart Animation */}
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage('cart')}
              className="w-16 h-16 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] rounded-full shadow-2xl flex items-center justify-center text-white font-bold text-lg"
            >
              {totalCartItems}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble Background Animation */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#7c9885]/20 to-[#f5a9bc]/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
            }}
            animate={{
              y: -20,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Auth Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent 
          className="glass-strong rounded-3xl border-0 max-w-md p-0 overflow-hidden"
          aria-describedby="auth-modal-description"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Authentication</DialogTitle>
            <DialogDescription id="auth-modal-description">
              Sign in or create an account to access all features
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <AuthPage 
              onPageChange={() => {}} 
              onAuthSuccess={handleAuthSuccess}
              isModal={true}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          className: 'glass-strong rounded-2xl border-0',
          style: {
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
          },
        }}
      />
    </div>
  );
}