"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { SelectBudgetOptions, SelectTravelsList } from "../utils/Options"
import type { BudgetOption, FormValues, PeopleOption } from "../utils/Types"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import usePlanner from "../hooks/usePlanner"

function CreateTrip() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const { generateItinerary, saveTrip, loading } = usePlanner()

  const [selectedBudget, setSelectedBudget] = useState("")
  const [selectedPeople, setSelectedPeople] = useState("")

  const onSubmit = async (data: FormValues) => {
    // console.log(data)
    try {
      const { destination, days, budget, people } = data
      const itinerary = await generateItinerary(destination, days, budget, people)
      if (!itinerary) return
      saveTrip(itinerary, destination, days, budget, people)
    } catch (err) {
      console.error("Error generating itinerary:", err)
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-8">
      {/* Logo */}
      <a href="/" className="absolute top-6">
        <img src="/logo.jpg" className="h-10 sm:h-12" alt="Logo" />
      </a>
      
      <form className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-4 w-full max-w-lg space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Plan Your Trip</h2>
        
        {/* Destination */}
        <div>
          <input
            type="text"
            placeholder="Enter Destination"
            {...register("destination", { required: "Destination is required" })}
            className="w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
          />
          {errors.destination && <p className="text-red-500 text-sm">{errors.destination.message}</p>}
        </div>
        
        {/* Days */}
        <div>
          <input
            type="number"
            placeholder="Number of Days"
            {...register("days", { required: "Days required", min: 1 })}
            className="w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
          />
          {errors.days && <p className="text-red-500 text-sm">{errors.days.message}</p>}
        </div>
        
        {/* Budget */}
        <div className="flex gap-2">
          {SelectBudgetOptions.map((option: BudgetOption) => (
            <label
              key={option.id}
              className={`flex-1 p-3 border rounded-lg cursor-pointer text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ${selectedBudget === option.title ? 'bg-[#f56551] text-white' : ''}`}
              onClick={() => setSelectedBudget(option.title)}
            >
              <input type="radio" {...register("budget", { required: "Select a budget" })} value={option.title} className="hidden" />
              <span className="text-xl">{option.icon}</span>
              <p className="text-sm mt-1 dark:text-white">{option.title}</p>
            </label>
          ))}
        </div>
        {errors.budget && <p className="text-red-500 text-sm">{errors.budget.message}</p>}
        
        {/* People */}
        <div className="flex gap-2">
          {SelectTravelsList.map((option: PeopleOption) => (
            <label
              key={option.id}
              className={`flex-1 p-3 border rounded-lg cursor-pointer text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ${selectedPeople === option.title ? 'bg-[#f56551] text-white' : ''}`}
              onClick={() => setSelectedPeople(option.title)}
            >
              <input type="radio" {...register("people", { required: "Select group" })} value={option.title} className="hidden" />
              <span className="text-xl">{option.icon}</span>
              <p className="text-sm mt-1 dark:text-white ">{option.title}</p>
            </label>
          ))}
        </div>
        {errors.people && <p className="text-red-500 text-sm">{errors.people.message}</p>}
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-white font-bold bg-[#f56551] hover:bg-[#e05a47] rounded-lg flex justify-center items-center disabled:opacity-50"
          disabled={loading}
        >
          {loading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mr-2" /> : null}
          {loading ? "Generating..." : "Generate Trip"}
        </button>
      </form>
    </div>
  )
}

export default CreateTrip
