import StepperCard from '@/customComponents/StepperCard'
import React from 'react'


    const steps = [
        {
            id: 1,
            title: "Personal Information",
            description: "Enter your basic details",
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your phone number"
                        />
                    </div>
                </div>
            ),
        },
        {
            id: 2,
            title: "Account Setup",
            description: "Configure your account preferences",
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Choose a username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Create a password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Account Type</label>
                        <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                            <option>Personal</option>
                            <option>Business</option>
                            <option>Enterprise</option>
                        </select>
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            title: "Preferences",
            description: "Set your preferences and notifications",
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Language</label>
                        <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Timezone</label>
                        <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                            <option>UTC-8 (Pacific)</option>
                            <option>UTC-5 (Eastern)</option>
                            <option>UTC+0 (GMT)</option>
                            <option>UTC+1 (CET)</option>
                        </select>
                    </div>
                    <div className="space-y-3">
                        <label className="block text-sm font-medium">Notifications</label>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" defaultChecked />
                                Email notifications
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" defaultChecked />
                                SMS notifications
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Marketing updates
                            </label>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 4,
            title: "Review & Confirm",
            description: "Review your information and complete setup",
            content: (
                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Summary</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p>Personal information completed ✓</p>
                            <p>Account setup configured ✓</p>
                            <p>Preferences set ✓</p>
                        </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                            By completing this setup, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-medium text-green-600">Ready to get started!</p>
                    </div>
                </div>
            ),
        },
    ]

const page = () => {
  return (
    <div>
      Analytics

      {/* the stepper card */}
      <StepperCard steps={steps} description="" title=''/>
    </div>
  )
}

export default page
