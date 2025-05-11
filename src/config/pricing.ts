/**
 * Bot Development Pricing Configuration
 * 
 * This file contains centralized pricing configuration for bot development services.
 * All prices are in USD.
 */

// Base prices for different types of bots
export const botBasePrices = {
  customerService: 299,
  aiAssistant: 499,
  telegramBot: 399,
  ecommerceBot: 599,
  corporateBot: 799,
}

// Package pricing
export const packagePricing = {
  starter: {
    name: 'starter',
    price: 499,
    features: [
      'customerServiceBot',
      'basicIntegration',
      'onePlatform',
      'basicAnalytics',
      'oneMonthSupport'
    ],
    botTypes: ['customerService'],
    maxBlocks: 100,
    setupFee: 0,
    monthlyFee: 29
  },
  professional: {
    name: 'professional',
    price: 999,
    features: [
      'aiAssistantBot',
      'advancedIntegration',
      'twoPlatforms',
      'advancedAnalytics',
      'threeMonthsSupport',
      'customDesign'
    ],
    botTypes: ['customerService', 'aiAssistant'],
    maxBlocks: 250,
    setupFee: 0,
    monthlyFee: 49,
    popular: true
  },
  enterprise: {
    name: 'enterprise',
    price: 1999,
    features: [
      'allBotTypes',
      'unlimitedIntegration',
      'allPlatforms',
      'premiumAnalytics',
      'sixMonthsSupport',
      'prioritySupport',
      'customDesign',
      'dedicatedManager'
    ],
    botTypes: ['customerService', 'aiAssistant', 'telegramBot', 'ecommerceBot'],
    maxBlocks: 'Unlimited',
    setupFee: 0,
    monthlyFee: 99
  }
}

// Add-on services pricing
export const addOnPricing = {
  systemIntegration: {
    price: 65,
    perUnit: true,
    description: 'Integration with one external system'
  },
  functionalUnit: {
    price: 30,
    perUnit: true,
    description: 'API connections and database queries'
  },
  multilingualSupport: {
    price: 15,
    perUnit: true,
    description: 'Translation module per language'
  },
  styledKeyboards: {
    price: 15,
    perUnit: false,
    description: 'Custom design for messaging app keyboards'
  },
  shopModule: {
    price: 60,
    perUnit: false,
    description: 'E-commerce functionality'
  },
  contentRevisions: {
    price: 15,
    perUnit: true,
    description: 'Changes to content blocks after delivery'
  },
  integrationRevisions: {
    price: 30,
    perUnit: true,
    description: 'Changes to integration blocks after delivery'
  },
  technicalMaintenance: {
    price: 30,
    perUnit: true,
    perHour: true,
    description: 'Technical support and maintenance'
  }
}

// Subscription pricing
export const subscriptionPricing = {
  singlePlatform: {
    price: 12,
    monthly: true,
    description: 'One bot platform (Telegram or Viber)'
  },
  multiPlatform: {
    price: 20,
    monthly: true,
    description: 'Multiple bot platforms'
  },
  enterprise: {
    price: 99,
    monthly: true,
    description: 'Enterprise-level hosting and support'
  }
}

// Feature descriptions for packages
export const featureDescriptions = {
  customerServiceBot: 'Customer Service Bot',
  aiAssistantBot: 'AI-Powered Assistant Bot',
  telegramBot: 'Telegram Bot',
  ecommerceBot: 'E-commerce Bot',
  corporateBot: 'Corporate Bot',
  basicIntegration: 'Integration with 1 system',
  advancedIntegration: 'Integration with up to 3 systems',
  unlimitedIntegration: 'Unlimited system integrations',
  onePlatform: 'Single platform deployment',
  twoPlatforms: 'Two platform deployments',
  allPlatforms: 'All platforms deployment',
  basicAnalytics: 'Basic analytics dashboard',
  advancedAnalytics: 'Advanced analytics with insights',
  premiumAnalytics: 'Premium analytics with AI predictions',
  oneMonthSupport: '1 month support included',
  threeMonthsSupport: '3 months support included',
  sixMonthsSupport: '6 months support included',
  prioritySupport: 'Priority 24/7 support',
  customDesign: 'Custom UI design',
  dedicatedManager: 'Dedicated project manager'
}

// Helper function to calculate total price with add-ons
export const calculateTotalPrice = (
  packageName: 'starter' | 'professional' | 'enterprise',
  addOns: string[] = []
) => {
  const basePrice = packagePricing[packageName].price;
  
  const addOnTotal = addOns.reduce((total, addOn) => {
    if (addOnPricing[addOn]) {
      return total + addOnPricing[addOn].price;
    }
    return total;
  }, 0);
  
  return basePrice + addOnTotal;
} 