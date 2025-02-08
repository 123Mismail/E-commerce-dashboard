import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="mt-4 text-lg text-gray-600">Welcome back, Admin! Here's an overview of your dashboard.</p>
      </div>
  
      {/* Welcome Message Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">👋 Hello, Admin!</h2>
        <p className="text-gray-600">
          Welcome to your admin dashboard. Here, you can manage your application, monitor activities, and access important insights. Let's make today productive!
        </p>
      </div>
  
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold">Total Odders</h3>
          <p className="text-3xl font-bold mt-2">1,234</p>
        </div>
        <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold">Active Products</h3>
          <p className="text-3xl font-bold mt-2">56</p>
        </div>
        <div className="bg-purple-500 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold">Pending Tasks</h3>
          <p className="text-3xl font-bold mt-2">23</p>
        </div>
      </div>
  
      {/* Recent Activity Section */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <p className="text-gray-700">New orders registered</p>
            <span className="text-sm text-gray-500">22</span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <p className="text-gray-700">Products added</p>
            <span className="text-sm text-gray-500">5</span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <p className="text-gray-700">Products Deleted</p>
            <span className="text-sm text-gray-500">1</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default page