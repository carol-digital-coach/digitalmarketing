"use client"

import React, { useState } from 'react';
import { CreditCard, Smartphone, Lock, CheckCircle, Package } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from "axios"
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

const colors = {
    background: '#180A0A',
    primary: '#711A75',
    highlight: '#F10086',
    soft: '#F582A7',
    cardBg: '#1E1E1E',
    textMain: '#FFFFFF',
    textMuted: '#A3A3A3',
    border: '#333333'
};

function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });
    const [mobileData, setMobileData] = useState({
        phoneNumber: '',
        provider: 'mpesa'
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const search_params = useSearchParams()
    const { data, isLoading, error } = useQuery({
        queryKey: ["package"],
        queryFn: async() => {
            const package_data = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL_LIVE}services/package?package-id=${search_params.get("package_id")}`)
            return package_data
        }
    })


    const packageDetails = {
        name: 'SEO Premium Package',
        price: 45000,
        currency: 'KSH',
        features: [
            'Comprehensive SEO Audit',
            'Technical & On-Page Optimization',
            'Local SEO Strategy',
            'Content Strategy & Planning',
            'Monthly Performance Reports',
            '24/7 Support Access'
        ],
        duration: '3 Months'
    };

    const handleCardInput = (e:any) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        } else if (name === 'expiryDate') {
            formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').substr(0, 5);
        } else if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').substr(0, 3);
        }

        setCardData(prev => ({ ...prev, [name]: formattedValue }));
    };  

    const handleMobileInput = (e:any) => {
        const { name, value } = e.target;
        setMobileData(prev => ({ ...prev, [name]: value }));
    };

    const handlePayment = () => {
        setIsProcessing(true);
        console.log('Processing payment:', { paymentMethod, cardData, mobileData, packageDetails });
        
        setTimeout(() => {
            setIsProcessing(false);
            alert('Payment processed successfully!');
        }, 2000);
    };

    return (
        <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: colors.background }}>
            <div className="max-w-7xl mx-auto mt-30">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.textMain }}>
                        Complete Your Purchase
                    </h1>
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                        Secure payment powered by industry-leading encryption
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {isLoading ? 
                        <div
                        className='flex flex-col space-y-3'
                        >
                            <Skeleton className='bg-[var(--site-purple)] w-full h-1/2' />
                            <Skeleton className='bg-[var(--site-purple)] w-full h-1/6' />
                            <Skeleton className='bg-[var(--site-purple)] w-1/4 h-1/8' />
                        </div>
                         : 
                         <div className="space-y-6">
                        <div className="p-6 rounded-xl border" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
                            <div className="flex items-center gap-3 mb-4">
                                <Package size={24} style={{ color: colors.highlight }} />
                                <h2 className="text-xl font-bold" style={{ color: colors.textMain }}>Package Summary</h2>
                            </div>
                            
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold mb-1" style={{ color: colors.soft }}>
                                    {data?.data?.data?.name}
                                </h3>
                                <p className="text-sm" style={{ color: colors.textMuted }}>
                                    package: {data?.data?.data?.description}
                                </p>
                            </div>

                            {/* Features List */}
                            <div className="space-y-3 mb-6">
                                {data?.data?.list.map((feature:any, index:any) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle size={20} className="mt-0.5 flex-shrink-0" style={{ color: colors.highlight }} />
                                        <span className="text-sm" style={{ color: colors.textMain }}>{feature.title}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Price */}
                            <div className="pt-6 border-t" style={{ borderColor: colors.border }}>
                                <div className="flex justify-between items-center mb-2">
                                    <span style={{ color: colors.textMuted }}>Subtotal</span>
                                    <span style={{ color: colors.textMain }}>
                                        {packageDetails.currency} {data?.data?.data.min_price.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span style={{ color: colors.textMuted }}>Tax (0%)</span>
                                    <span style={{ color: colors.textMain }}>
                                        {packageDetails.currency} 0
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: colors.border }}>
                                    <span className="text-lg font-bold" style={{ color: colors.textMain }}>Total</span>
                                    <span className="text-2xl font-bold" style={{ color: colors.highlight }}>
                                        {packageDetails.currency} {data?.data?.data.min_price.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Security Badge */}
                        <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: colors.cardBg }}>
                            <Lock size={20} style={{ color: colors.soft }} />
                            <p className="text-sm" style={{ color: colors.textMuted }}>
                                Your payment information is encrypted and secure
                            </p>
                        </div>
                    </div>}

                    {/* RIGHT: Payment Methods */}
                    <div>
                        <div className="p-6 rounded-xl border" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
                            <h2 className="text-xl font-bold mb-6" style={{ color: colors.textMain }}>
                                Payment Method
                            </h2>

                            {/* Payment Method Toggle */}
                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className="flex-1 flex items-center justify-center gap-2 p-4 rounded-lg font-medium transition-all"
                                    style={{
                                        backgroundColor: paymentMethod === 'card' ? colors.primary : colors.background,
                                        color: colors.textMain,
                                        border: `2px solid ${paymentMethod === 'card' ? colors.highlight : colors.border}`
                                    }}
                                >
                                    <CreditCard size={20} />
                                    Card
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('mobile')}
                                    className="flex-1 flex items-center justify-center gap-2 p-4 rounded-lg font-medium transition-all"
                                    style={{
                                        backgroundColor: paymentMethod === 'mobile' ? colors.primary : colors.background,
                                        color: colors.textMain,
                                        border: `2px solid ${paymentMethod === 'mobile' ? colors.highlight : colors.border}`
                                    }}
                                >
                                    <Smartphone size={20} />
                                    Mobile Money
                                </button>
                            </div>

                            {/* Card Payment Form */}
                            {paymentMethod === 'card' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: colors.textMuted }}>
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={cardData.cardNumber}
                                            onChange={handleCardInput}
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                                            style={{
                                                backgroundColor: colors.background,
                                                borderColor: colors.border,
                                                color: colors.textMain
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: colors.textMuted }}>
                                            Cardholder Name
                                        </label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={cardData.cardName}
                                            onChange={handleCardInput}
                                            placeholder="John Doe"
                                            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                                            style={{
                                                backgroundColor: colors.background,
                                                borderColor: colors.border,
                                                color: colors.textMain
                                            }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: colors.textMuted }}>
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={cardData.expiryDate}
                                                onChange={handleCardInput}
                                                placeholder="MM/YY"
                                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                                                style={{
                                                    backgroundColor: colors.background,
                                                    borderColor: colors.border,
                                                    color: colors.textMain
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: colors.textMuted }}>
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={cardData.cvv}
                                                onChange={handleCardInput}
                                                placeholder="123"
                                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                                                style={{
                                                    backgroundColor: colors.background,
                                                    borderColor: colors.border,
                                                    color: colors.textMain
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Mobile Money Form */}
                            {paymentMethod === 'mobile' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: colors.textMuted }}>
                                            Select Provider
                                        </label>
                                        <select
                                            name="provider"
                                            value={mobileData.provider}
                                            onChange={handleMobileInput}
                                            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                                            style={{
                                                backgroundColor: colors.background,
                                                borderColor: colors.border,
                                                color: colors.textMain
                                            }}
                                        >
                                            <option value="mpesa">M-Pesa</option>
                                            <option value="airtel">Airtel Money</option>
                                            <option value="tkash">T-Kash</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: colors.textMuted }}>
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={mobileData.phoneNumber}
                                            onChange={handleMobileInput}
                                            placeholder="0712 345 678"
                                            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                                            style={{
                                                backgroundColor: colors.background,
                                                borderColor: colors.border,
                                                color: colors.textMain
                                            }}
                                        />
                                    </div>

                                    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
                                        <p className="text-sm" style={{ color: colors.textMuted }}>
                                            You will receive a payment prompt on your phone. Enter your PIN to complete the transaction.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Pay Button */}
                            <button
                                onClick={handlePayment}
                                disabled={true}
                                className="w-full mt-6 py-4 rounded-lg font-bold text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: colors.highlight,
                                    color: colors.textMain
                                }}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Lock size={20} />
                                        Pay {packageDetails.currency} {data?.data?.data.min_price.toLocaleString()}
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs mt-4" style={{ color: colors.textMuted }}>
                                By completing this purchase, you agree to our Terms of Service
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function PaymentApp() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <PaymentPage />
        </Suspense>
    )
}