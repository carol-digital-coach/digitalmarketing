"use client"

import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"

export default function TestPage() {
    const handleSuccess = () => toast.success("Event created successfully!");
    const handleError = () => toast.error("Something went wrong.");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">Testing Hot Toast</h1>
            <div className="flex gap-2">
                <Button variant="outline" onClick={handleSuccess}>
                    Success
                </Button>
                <Button variant="outline" onClick={handleError}>
                    Error
                </Button>
                <Button
                    variant="outline"
                    onClick={() => toast.success('Look at my styles.', {
                        style: {
                            border: '1px solid #713200',
                            padding: '16px',
                            color: '#713200',
                        },
                        iconTheme: {
                            primary: '#713200',
                            secondary: '#FFFAEE',
                        },
                        icon: (
                            <div className='w-24 h-24 overflow-hidden'>

                            </div>
                        )
                    })}
                >
                    Loading
                </Button>
            </div>
        </div>
    );
}