import { Link } from "react-router-dom"
import { ArrowRight, MapPin, Calendar, Sparkles } from "lucide-react"
import { ThemeToggle } from "../components/theme-toggle"
import LOGO from "../assets/logo.jpg"

function Landing() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white transition-colors">
      {/* Header */}
      <header className="py-4 px-6 border-b dark:border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/">
          <img src={LOGO} className="h-7 sm:h-9"></img>
          </a>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              to="/create-trip"
              className="px-4 py-2 bg-[#f56551] text-white rounded-md hover:bg-[#e05a47] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                <span className="text-[#f56551]">Discover Your Next Adventure with AI: </span>
                Personalized itineraries at your fingertips.
              </h1>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                Your personal trip planner and travel curator, creating custom trips tailored to your budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/create-trip"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#f56551] text-white rounded-md hover:bg-[#e05a47] transition-colors group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden">
              <img
                src="https://cdn.leonardo.ai/users/70847f41-1777-4146-ba38-c683c86d8231/generations/72c955ba-2161-452f-ab2a-256759ee1e3c/segments/1:4:1/Flux_Dev_Create_an_image_with_a_transparent_background_depicti_0.jpeg"
                alt="Travel destinations"
                className="absolute inset-0 w-full h-full object-fill"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Our AI Travel Planner</h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the future of travel planning with our intelligent assistant.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-3 bg-[#f56551]/10 rounded-full mb-4">
                <Sparkles className="h-6 w-6 text-[#f56551]" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Recommendations</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Our AI analyzes thousands of destinations to find the perfect match for your preferences.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-3 bg-[#f56551]/10 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-[#f56551]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Itineraries</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Get custom day-by-day plans that match your interests, pace, and budget.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-3 bg-[#f56551]/10 rounded-full mb-4">
                <Calendar className="h-6 w-6 text-[#f56551]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Budget-Friendly Planning</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Optimize your travel expenses with smart recommendations that respect your budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Dream Trip?</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
              Join thousands of travelers who have discovered their perfect itinerary with our AI planner.
            </p>
            <Link
              to="/create-trip"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#f56551] text-white rounded-md hover:bg-[#e05a47] transition-colors text-lg"
            >
              Start Planning Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} TravelAI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#f56551]"> Do Enjoy.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing

