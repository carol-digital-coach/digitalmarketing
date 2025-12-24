"use client"
import { useState, FC, useEffect } from "react"
import { PlusCircle, Trash2, DollarSign, List, FileText, Upload, Package, Plus } from "lucide-react"
import axios from "axios"
import { ServiceTable } from "@/app/components/serviceTable"

import { Button } from "@/components/ui/button"
const COLOR_BLACK = '#180A0A';
const COLOR_PURPLE = '#711A75';
const COLOR_PINK = '#F10086';
const COLOR_LIGHT_PINK = '#F582A7';

interface ServicePoint {
    title: string;
}

interface ServicePackage {
    name: string;
    description: string;
    min_price: number;
    max_price: number;
}

interface ServicePackagePoint {
    package: Array<{
        title: string
    }>
}

interface GlobalFormData {
    title: string;
    short_description: string;
    service_points: Array<ServicePoint>;
    service_package: Array<ServicePackage>;
    service_package_points: Array<ServicePackagePoint>;
}

interface InputFieldProps {
    id: string;
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    type?: string;
    rows?: number;
    required?: boolean;
    className?: string;
}

const InputField: FC<InputFieldProps> = ({ label, id, value, onChange, placeholder, type = 'text', rows, required = false, className = '' }) => {
    const InputComponent = rows ? 'textarea' : 'input';
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <InputComponent
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full px-4 py-2 border border-gray-600 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-[${COLOR_PINK}] focus:border-[${COLOR_PINK}] transition duration-150 ease-in-out shadow-inner`}
                placeholder={placeholder}
                {...(rows ? { rows: rows } : { type: type })}
            />
        </div>
    );
};

// --- Component 1: Service Details ---
interface ServiceDetailsProps {
    initialData: GlobalFormData;
    onDataChange: (data: GlobalFormData) => void;
}

const ServiceDetails: FC<ServiceDetailsProps> = ({ initialData, onDataChange }) => {
    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const updatedData = {
            ...initialData,
            [id]: value
        };
        onDataChange(updatedData);
    };

    return (
        <div className="mt-8 p-4 md:p-8 text-white w-full">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-white pb-3">Service Details</h3>
            <div className="space-y-6 max-w-xl">
                <InputField
                    id="title"
                    label="Service Title"
                    placeholder="e.g., Advanced SEO Audit"
                    required
                    onChange={handleDataChange}
                    value={initialData.title}
                    className="outline-none p-2"
                />
                <InputField
                    id="short_description"
                    label="Service Description"
                    placeholder="Describe your service, what's included, and expected outcomes."
                    rows={6}
                    required
                    className="h-32 bg-white w-full text-black p-2 outline-none"
                    onChange={handleDataChange}
                    value={initialData.short_description}
                />
            </div>
        </div>
    );
}


interface ServiceKeyPointsProps {
    initialData: GlobalFormData;
    onDataChange: (data: GlobalFormData) => void;
}

const ServiceKeyPoints: FC<ServiceKeyPointsProps> = ({ initialData, onDataChange }) => {
    const [newPoint, setNewPoint] = useState("");
    const servicePoints = initialData.service_points || [];

    const addKeyPoint = () => {
        if (newPoint.trim() !== "") {
            const updatedData = {
                ...initialData,
                service_points: [...servicePoints, { title: newPoint.trim() }]
            };
            onDataChange(updatedData);
            setNewPoint("");
        }
    };

    const removeKeyPoint = (index: number) => {
        const updatedPoints = servicePoints.filter((_, i) => i !== index);
        const updatedData = {
            ...initialData,
            service_points: updatedPoints
        };
        onDataChange(updatedData);
    };

    const updateKeyPoint = (index: number, value: string) => {
        const updatedPoints = [...servicePoints];
        updatedPoints[index] = { title: value };
        const updatedData = {
            ...initialData,
            service_points: updatedPoints
        };
        onDataChange(updatedData);
    };

    return (
        <div className="mt-8 p-4 md:p-8 text-white w-full">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-white pb-3">Key Inclusions & Features</h3>
            <div className="space-y-4 max-w-xl">
                <div className="flex items-center space-x-2">
                    <InputField
                        id="newKeyPoint"
                        label="Add New Key Point"
                        placeholder="e.g., Dedicated 24/7 priority support"
                        value={newPoint}
                        onChange={(e) => setNewPoint(e.target.value)}
                        className="flex-grow outline-none"
                    />
                    <button
                        type="button"
                        onClick={addKeyPoint}
                        className={`mt-7 p-3 rounded-full text-white transition duration-200 shadow-md ${newPoint.trim()
                            ? `bg-[var(--site-pink)]/50 hover:bg-[var(--site-pink)]`
                            : `bg-[var(--site-pink)] cursor-not-allowed`
                            }`}
                        disabled={!newPoint.trim()}
                        title="Add Key Point"
                    >
                        <PlusCircle className="w-6 h-6" />
                    </button>
                </div>

                <ul className="space-y-3 pt-4">
                    {servicePoints.length === 0 && (
                        <p className="text-white italic">No key points added yet.</p>
                    )}
                    {servicePoints.map((point, index) => (
                        <li
                            key={index}
                            className={`flex justify-between items-center bg-[var(--site-black)]/50 hover:bg-[var(--site-black)] hover:cursor-pointer backdrop-blur-sm p-3 rounded-lg`}
                        >
                            <div className="flex-grow mr-4">
                                <input
                                    type="text"
                                    value={point.title}
                                    onChange={(e) => updateKeyPoint(index, e.target.value)}
                                    className="w-full bg-transparent text-white border-none focus:outline-none focus:ring-0"
                                    placeholder="Enter key point"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeKeyPoint(index)}
                                className="text-gray-400 hover:text-red-500 transition duration-150"
                                title="Remove"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

interface ServicePackagesProps {
    initialData: GlobalFormData;
    onDataChange: (data: GlobalFormData) => void;
}

const ServicePackages: FC<ServicePackagesProps> = ({ initialData, onDataChange }) => {
    const packages = initialData.service_package || [];
    const packagePoints = initialData.service_package_points || [];

    const addPackage = () => {
        const newPackage = {
            name: "",
            description: "",
            min_price: 0,
            max_price: 0
        };
        const newPackagePoint = {
            package: [{ title: "" }, { title: "" }]
        };

        const updatedData = {
            ...initialData,
            service_package: [...packages, newPackage],
            service_package_points: [...packagePoints, newPackagePoint]
        };
        onDataChange(updatedData);
    };

    const removePackage = (index: number) => {
        const updatedPackages = packages.filter((_, i) => i !== index);
        const updatedPackagePoints = packagePoints.filter((_, i) => i !== index);
        const updatedData = {
            ...initialData,
            service_package: updatedPackages,
            service_package_points: updatedPackagePoints
        };
        onDataChange(updatedData);
    };

    const updatePackage = (index: number, field: keyof ServicePackage, value: string | number) => {
        const updatedPackages = [...packages];
        updatedPackages[index] = {
            ...updatedPackages[index],
            [field]: field.includes('price') ? Number(value) : value
        };
        const updatedData = {
            ...initialData,
            service_package: updatedPackages
        };
        onDataChange(updatedData);
    };

    const updatePackagePoint = (packageIndex: number, pointIndex: number, value: string) => {
        const updatedPackagePoints = [...packagePoints];
        if (!updatedPackagePoints[packageIndex]) {
            updatedPackagePoints[packageIndex] = { package: [] };
        }
        if (!updatedPackagePoints[packageIndex].package[pointIndex]) {
            updatedPackagePoints[packageIndex].package[pointIndex] = { title: "" };
        }
        updatedPackagePoints[packageIndex].package[pointIndex].title = value;

        const updatedData = {
            ...initialData,
            service_package_points: updatedPackagePoints
        };
        onDataChange(updatedData);
    };

    return (
        <div className="mt-8 p-4 md:p-8 text-white w-full">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-white pb-3">Service Packages</h3>

            <button
                type="button"
                onClick={addPackage}
                className={`mb-6 p-3 rounded-lg text-white transition duration-200 shadow-md bg-[${COLOR_PINK}] hover:bg-[${COLOR_LIGHT_PINK}] flex items-center space-x-2`}
            >
                <PlusCircle className="w-5 h-5" />
                <span>Add Package</span>
            </button>

            <div className="space-y-8 p-2 lg:max-h-[60vh]">
                {packages.length === 0 && (
                    <p className="text-white italic">No packages added yet.</p>
                )}

                {packages.map((pkg, pkgIndex) => (
                    <div key={pkgIndex} className="bg-[var(--site-black)]/30 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xl font-semibold">Pricing for package {pkgIndex + 1}</h4>
                            <button
                                type="button"
                                onClick={() => removePackage(pkgIndex)}
                                className="text-gray-400 hover:text-red-500 transition duration-150"
                                title="Remove Package"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <InputField
                                id={`package-name-${pkgIndex}`}
                                label="Package Name"
                                placeholder="e.g., Basic Plan, Premium Plan"
                                value={pkg.name}
                                onChange={(e) => updatePackage(pkgIndex, 'name', e.target.value)}
                                className="bg-white text-gray-800"
                            />

                            <InputField
                                id={`package-desc-${pkgIndex}`}
                                label="Package Description"
                                placeholder="Describe what this package includes"
                                rows={3}
                                value={pkg.description}
                                onChange={(e) => updatePackage(pkgIndex, 'description', e.target.value)}
                                className="bg-white text-gray-800 p-2 w-full"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <InputField
                                    id={`package-min-${pkgIndex}`}
                                    label="Min Price ($)"
                                    type="number"
                                    placeholder="0"
                                    value={pkg.min_price}
                                    onChange={(e) => updatePackage(pkgIndex, 'min_price', e.target.value)}
                                    className="bg-white text-gray-800"
                                />

                                <InputField
                                    id={`package-max-${pkgIndex}`}
                                    label="Max Price ($)"
                                    type="number"
                                    placeholder="0"
                                    value={pkg.max_price}
                                    onChange={(e) => updatePackage(pkgIndex, 'max_price', e.target.value)}
                                    className="bg-white text-gray-800"
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-white mb-2">
                                    Package Points
                                </label>
                                <div className="space-y-2">
                                    {(packagePoints[pkgIndex]?.package || []).map((point, pointIndex) => (
                                        <div key={pointIndex} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={point.title}
                                                onChange={(e) => updatePackagePoint(pkgIndex, pointIndex, e.target.value)}
                                                placeholder={`Package point ${pointIndex + 1}`}
                                                className="flex-grow px-4 py-2 bg-white text-black border border-gray-600 rounded-sm outline-none"
                                            />
                                            {pointIndex >= 2 && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updatedPoints = [...(packagePoints[pkgIndex]?.package || [])];
                                                        updatedPoints.splice(pointIndex, 1);
                                                        updatePackagePoint(pkgIndex, pointIndex, "");
                                                    }}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            updatePackagePoint(pkgIndex, (packagePoints[pkgIndex]?.package?.length || 0), "");
                                        }}
                                        className="text-sm text-[${COLOR_PINK}] hover:text-[${COLOR_LIGHT_PINK}] flex items-center space-x-1"
                                    >
                                        <PlusCircle className="w-4 h-4" />
                                        <span>Add Package Point</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function ServicesPage() {
    const [selected, setIsSelected] = useState<string>("serviceDetails")
    const [isSaving, setIsSaving] = useState(false);
    const [isServiceTab, setIsServiceTab] = useState(true)

    const [formData, setFormData] = useState<GlobalFormData>({
        title: "",
        short_description: "",
        service_points: [],
        service_package: [],
        service_package_points: []
    });

    const selected_tab = [
        { id: "serviceDetails", title: "Service Details", icon: FileText },
        { id: "serviceKeypoints", title: "Key Points", icon: List },
        { id: "servicePackages", title: "Packages", icon: Package },
        { id: "servicePricing", title: "Pricing", icon: DollarSign }
    ]

    const handleAddService = async () => {
        setIsSaving(true);
        try {
            // Prepare data for backend
            const dataToSend = {
                ...formData,
                // Ensure numeric fields are numbers
                service_package: formData.service_package.map(pkg => ({
                    ...pkg,
                    min_price: Number(pkg.min_price) || 0,
                    max_price: Number(pkg.max_price) || 0
                }))
            };

            // This is where you would make your API call
            console.log("Data to send to backend:", dataToSend);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL_LIVE}services/create-service/`, dataToSend)
            console.log(response.data)
            alert('Service saved successfully!');

            // Reset form if needed
            setFormData({
                title: "",
                short_description: "",
                service_points: [],
                service_package: [],
                service_package_points: []
            });

        } catch (error) {
            console.error('Error saving service:', error);
            alert('Failed to save service. Please try again.');
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-200 p-4 sm:p-8">
            <div className="border-b border-slate-200 pb-8 mb-5">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                            Services
                        </h1>
                        <p className="text-lg text-slate-500">
                            Manage and monitor your services here
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => setIsServiceTab(true)}
                            variant="outline"
                            className="border-slate-200 text-slate-600 hover:bg-slate-50 h-10 min-w-10 cursor-pointer"
                        >
                            All Services
                        </Button>
                        <Button
                            onClick={() => setIsServiceTab(false)}
                            className="bg-[var(--site-purple)] hover:bg-[var(--site-pink)] text-white shadow-sm transition-all cursor-pointer"
                        >
                            <Plus className="mr-2 h-4 w-4 border border-white rounded-full" /> Add Service
                        </Button>
                    </div>
                </div>
            </div>
            <div
                className="border p-2"
            >

                {isServiceTab ?
                    <div>
                        <ServiceTable />
                    </div>
                    :
                    <div className="relative flex justify-center items-start pt-10">
                        <div className={`flex flex-col md:flex-row bg-[${COLOR_PURPLE}] min-h-[80vh] w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden`}>

                            {/* Left Panel: Navigation/Tabs */}
                            <div className={`flex-shrink-0 w-full md:w-56 p-4 space-y-2 bg-[${COLOR_BLACK}]/80 border-r border-[${COLOR_PINK}]/50`}>
                                {selected_tab.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <div key={tab.id}>
                                            <button
                                                id={tab.id}
                                                className={`w-full text-left font-semibold p-3 rounded-lg transition-colors duration-200 ease-in-out cursor-pointer text-sm md:text-base flex items-center ${selected === tab.id
                                                    ? `bg-[${COLOR_PINK}] text-white shadow-lg`
                                                    : `text-gray-300 hover:bg-[${COLOR_PURPLE}] hover:text-white`
                                                    }`}
                                                onClick={() => setIsSelected(tab.id)}
                                            >
                                                <Icon className="w-5 h-5 mr-3" />
                                                {tab.title}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Right Panel: Content Area */}
                            <div className="flex-grow p-4 md:p-6 overflow-auto">
                                {selected === "serviceDetails" && (
                                    <ServiceDetails
                                        initialData={formData}
                                        onDataChange={setFormData}
                                    />
                                )}
                                {selected === "serviceKeypoints" && (
                                    <ServiceKeyPoints
                                        initialData={formData}
                                        onDataChange={setFormData}
                                    />
                                )}
                                {selected === "servicePackages" && (
                                    <ServicePackages
                                        initialData={formData}
                                        onDataChange={setFormData}
                                    />
                                )}
                                {selected === "servicePricing" && (
                                    <div className="mt-8 p-4 md:p-8 text-white w-full">
                                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-white pb-3">Service Packages Pricing</h3>
                                        <p className="text-gray-300 mb-4">
                                            Each service package has three pricing categories, based on what service is offered
                                        </p>
                                        <div className=" p-6 rounded-lg">
                                            <h4 className="text-lg font-semibold mb-4">Current Packages:</h4>
                                            {formData.service_package.length === 0 ? (
                                                <p className="text-gray-400 italic">No packages added yet. Add packages in the Packages tab.</p>
                                            ) : (
                                                <ul className="space-y-3">
                                                    {formData.service_package.map((pkg, index) => (
                                                        <li key={index} className="flex justify-between items-center bg-[var(--site-black)]/50 p-3 rounded">
                                                            <div>
                                                                <span className="font-medium">{pkg.name || `Package ${index + 1}`}</span>
                                                                <p className="text-sm text-gray-400">{pkg.description || "No description"}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="font-bold text-[var(--site-pink)]">
                                                                    KES: {pkg.min_price || 0}
                                                                    {pkg.max_price && pkg.max_price > pkg.min_price ? ` - ${pkg.max_price}` : ''}
                                                                </span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleAddService}
                            disabled={isSaving}
                            className={`
                            absolute -bottom-6 
                            left-1/2 transform -translate-x-1/2 
                            lg:bottom-1 lg:left-[calc(50%+1.5rem)] lg:w-[calc(66.666%)] lg:transform-none 
                            
                            text-white font-bold py-3 px-6 rounded-lg 
                            shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 w-11/12 md:w-1/2
                            
                            ${isSaving
                                    ? `bg-gray-500 cursor-not-allowed`
                                    : `bg-[${COLOR_PINK}] hover:bg-[${COLOR_LIGHT_PINK}] active:scale-[0.99]`
                                }
                        `}
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-3 border-4 border-t-white border-r-white border-b-white border-l-transparent rounded-full" viewBox="0 0 24 24"></svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    <span>Add Service</span>
                                </>
                            )}
                        </button>
                    </div>}
            </div>
        </div>
    )
}