"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Save, X, Settings, Loader2, Info, List, DollarSign } from 'lucide-react';

// --- Color Definitions (Dark Mode Palette) ---
const colors = {
    background: '#180A0A',
    cardBg: '#1E1E1E',
    primary: '#711A75',
    highlight: '#F10086',
    soft: '#F582A7',
    textMain: '#FFFFFF',
    textMuted: '#A3A3A3',
    border: '#333333'
};
import { ScrollFadeIn } from '@/app/components/scrollanimation';
import { Input } from '@/components/ui/input';

interface textArea {
    label: string,
    id: any,
    value: string,
    onChange: any,
    placeholder: string
}

const TextAreaField = ({ label, id, value, onChange, placeholder } : textArea) => (
    <div className="mb-6">
        <label htmlFor={id} className="block text-sm font-medium mb-2 text-white">
            {label}
        </label>
        <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none resize-none bg-white"
        />
    </div>
);

// --- Main Component ---
export default function AdminServiceCreator() {
    const [activeTab, setActiveTab] = useState('serviceInfo');
    const [formData, setFormData] = useState({
        serviceTitle: '',
        serviceDescription: '',
        package1Name: 'Standard Package',
        package1MinPrice: 35000,
        package1MaxPrice: 60000,
        package1Description: 'Comprehensive strategy and execution.',
        keyPoints: [{ id: Date.now(), title: 'Initial Key Point' }],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleInputChange = (e: any) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleKeyPointChange = (id:any, value:any) => {
        setFormData(prev => ({
            ...prev,
            keyPoints: prev.keyPoints.map(kp =>
                kp.id === id ? { ...kp, title: value } : kp
            ),
        }));
    };

    const addKeyPoint = () => {
        setFormData(prev => ({
            ...prev,
            keyPoints: [...prev.keyPoints, { id: Date.now(), title: '' }],
        }));
    };

    const removeKeyPoint = (id:any) => {
        setFormData(prev => ({
            ...prev,
            keyPoints: prev.keyPoints.filter(kp => kp.id !== id),
        }));
    };

    const handleSubmit = () => {
        setIsLoading(true);
        setMessage('');
        setIsError(false);

        console.log('Form data submitted:', formData);
        
        setTimeout(() => {
            setIsLoading(false);
            if (Math.random() > 0.2) {
                setMessage(`Service "${formData.serviceTitle || 'New Service'}" created successfully!`);
                setIsError(false);
            } else {
                setMessage('Error: Failed to save data.');
                setIsError(true);
            }
        }, 1500);
    };

    // Component for Tab 1: Service Information
    const ServiceInfoTab = () => (
        <>
            <h2 className="text-2xl font-bold mb-6 text-white">1. Core Details</h2>
            <Input 
                id="serviceTitle" 
                value={formData.serviceTitle} 
                onChange={handleInputChange} 
                placeholder="Enter the main service title"
            />
            <TextAreaField 
                label="Short Description (Appears under the title)" 
                id="serviceDescription" 
                value={formData.serviceDescription} 
                onChange={handleInputChange} 
                placeholder="A concise description of the service"
            />
        </>
    );

    // Component for Tab 2: Key Points Management
    const KeyPointsTab = () => (
        <>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.highlight }}>2. Methodology Key Points</h2>
            <div className="space-y-4 mb-6">
                {formData.keyPoints.map((kp, index) => (
                    <div key={kp.id} className="flex items-center space-x-3">
                        <Input
                            id={`keyPoint-${kp.id}`}
                            value={kp.title}
                            onChange={(e) => handleKeyPointChange(kp.id, e.target.value)}
                            placeholder="e.g., Technical & Local Audit"
                            className="flex-grow"
                        />
                        <button
                            type="button"
                            onClick={() => removeKeyPoint(kp.id)}
                            disabled={formData.keyPoints.length === 1}
                            className="mt-6 p-2 rounded-full transition-colors disabled:opacity-50"
                            style={{ backgroundColor: colors.primary, color: colors.textMain }}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={addKeyPoint}
                className="w-full py-3 rounded-lg flex items-center justify-center font-medium transition-colors"
                style={{ backgroundColor: colors.primary, color: colors.textMain }}
            >
                <Plus size={20} className="mr-2" /> Add Key Point
            </button>
        </>
    );

    // Component for Tab 3: Pricing Details
    const PricingTab = () => (
        <>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.highlight }}>3. Package Details</h2>
            <Input 
                id="package1Name" 
                value={formData.package1Name} 
                onChange={handleInputChange} 
                placeholder="e.g., Standard SEO"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                    id="package1MinPrice" 
                    type="number" 
                    value={formData.package1MinPrice} 
                    onChange={handleInputChange} 
                    placeholder="e.g., 35000"
                    className="mb-0"
                />
                <Input 
                    id="package1MaxPrice" 
                    type="number" 
                    value={formData.package1MaxPrice} 
                    onChange={handleInputChange} 
                    placeholder="e.g., 60000"
                    className="mb-0"
                />
            </div>
            <TextAreaField
                label="Package Description"
                id="package1Description"
                value={formData.package1Description}
                onChange={handleInputChange}
                placeholder="A brief summary of what this package includes."
            />
        </>
    );

    const tabs = [
        { id: 'serviceInfo', label: 'Service Information', icon: Info, component: ServiceInfoTab },
        { id: 'keyPoints', label: 'Key Pillars (Points)', icon: List, component: KeyPointsTab },
        { id: 'pricing', label: 'Pricing Package', icon: DollarSign, component: PricingTab },
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ServiceInfoTab;

    return (
        <div className="min-h-screen p-4 sm:p-8 bg-white">
            <div className="container mx-auto max-w-6xl py-12">
                
                {/* Header */}
                <ScrollFadeIn>
                    <div className="flex items-center mb-10 border-b pb-4" style={{ borderColor: colors.border }}>
                        <Settings size={32} />
                        <h1 className="text-3xl font-bold ml-4">
                            Add New Service Package
                        </h1>
                    </div>
                </ScrollFadeIn>

                {message && (
                    <ScrollFadeIn delay={100}>
                        <div 
                            className={`p-4 rounded-lg mb-6 flex items-center ${isError ? 'bg-red-900 border-red-700' : 'bg-green-900 border-green-700'}`}
                            style={{ border: '1px solid' }}
                        >
                            <X size={20} className="mr-3" style={{ color: isError ? colors.soft : colors.highlight }} />
                            <p className="text-sm font-medium" style={{ color: isError ? colors.soft : colors.textMain }}>
                                {message}
                            </p>
                        </div>
                    </ScrollFadeIn>
                )}

                {/* Tabbed Form Container */}
                <div className="space-y-12">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8 p-8 rounded-xl border bg-[var(--site-purple)]">
                        
                        {/* Left: Vertical Tabs Navigation */}
                        <div className="lg:col-span-3 mb-8 lg:mb-0">
                            <h3 className="uppercase font-semibold mb-4 tracking-wider text-white text-lg ml-3" >Service Sections</h3>
                            <nav className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full text-left flex items-center p-3 rounded-lg font-medium transition-colors duration-200 ${
                                            activeTab === tab.id
                                                ? 'shadow-lg'
                                                : 'hover:bg-gray-800'
                                        }`}
                                        style={{
                                            color: activeTab === tab.id ? colors.background : colors.textMain,
                                            backgroundColor: activeTab === tab.id ? colors.highlight : 'transparent',
                                        }}
                                    >
                                        <tab.icon size={20} className="mr-3" />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Right: Tab Content Area */}
                        <div className="lg:col-span-9 p-6 lg:p-0 lg:p-4">
                            <ScrollFadeIn key={activeTab}>
                                <ActiveComponent />
                            </ScrollFadeIn>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <ScrollFadeIn delay={500}>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full py-4 text-lg font-bold uppercase rounded-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                            style={{ 
                                backgroundColor: colors.highlight, 
                                color: colors.background, 
                                boxShadow: `0 4px 20px -5px ${colors.highlight}80`,
                            }}
                        >
                            {isLoading ? (
                                <Loader2 size={24} className="animate-spin mr-3" />
                            ) : (
                                <Save size={24} className="mr-3" />
                            )}
                            {isLoading ? 'Processing...' : 'Create New Service'}
                        </button>
                        <p className="text-center text-xs mt-2" style={{ color: colors.textMuted }}>
                            Form submission is simulated client-side.
                        </p>
                    </ScrollFadeIn>
                </div>
            </div>
        </div>
    );
}