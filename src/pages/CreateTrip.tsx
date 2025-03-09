"use client"
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

  const { generateItinerary, saveTrip, loading, error, response } = usePlanner()

  const onSubmit = async (data: FormValues) => {
    console.log(data)
    try {
      const { destination, days, budget, people } = data
      const itinerary = await generateItinerary(destination, days, budget, people)
      if (!itinerary) {
        console.error("Itinerary generation failed or returned undefined.")
        return
      }

      saveTrip(itinerary, destination, days, budget, people)
      return itinerary
    } catch (err) {
      console.error("Error generating itinerary:", err)
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 px-5 sm:px-10 lg:px-20 transition-colors">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-bold text-3xl sm:text-4xl text-gray-800 dark:text-white">
          Tell us your travel preferences
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your
          preferences.
        </p>
      </div>

      {/* Form */}
      <form
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mt-10 max-w-3xl mx-auto space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Destination Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-200">
            What is the destination of your choice?
          </label>
          <input
            placeholder="Example: Chennai"
            type="text"
            {...register("destination", { required: "Destination is required" })}
            className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
        </div>

        {/* Days Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-200">
            How many days are you planning for your trip?
          </label>
          <input
            placeholder="Example: 3"
            type="number"
            {...register("days", {
              required: "Number of days is required",
              min: { value: 1, message: "At least 1 day is required" },
            })}
            className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          {errors.days && <p className="text-red-500 text-sm mt-1">{errors.days.message}</p>}
        </div>

        {/* Budget Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-200">What is your budget?</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            {SelectBudgetOptions.map((option: BudgetOption) => (
              <label
                key={option.id}
                className="p-4 border rounded-lg hover:shadow-lg cursor-pointer flex flex-col items-center justify-center text-center bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 transition-all"
              >
                <input
                  type="radio"
                  value={option.title}
                  {...register("budget", { required: "Please select a budget" })}
                  className="hidden"
                />
                <span className="text-3xl">{option.icon}</span>
                <span className="text-lg font-semibold mt-2 text-gray-800 dark:text-white">{option.title}</span>
                <span className="text-sm text-gray-500 dark:text-gray-300">{option.desc}</span>
              </label>
            ))}
          </div>
          {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
        </div>

        {/* People Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-200">
            Who do you plan on traveling with on your next adventure?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            {SelectTravelsList.map((option: PeopleOption) => (
              <label
                key={option.id}
                className="p-4 border rounded-lg hover:shadow-lg cursor-pointer flex flex-col items-center justify-center text-center bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 transition-all"
              >
                <input
                  type="radio"
                  value={option.title}
                  {...register("people", {
                    required: "Please select a group size",
                  })}
                  className="hidden"
                />
                <span className="text-3xl">{option.icon}</span>
                <span className="text-lg font-semibold mt-2 text-gray-800 dark:text-white">{option.title}</span>
                <span className="text-sm text-gray-500 dark:text-gray-300">{option.desc}</span>
              </label>
            ))}
          </div>
          {errors.people && <p className="text-red-500 text-sm mt-1">{errors.people.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#f56551] hover:bg-[#e05a47] text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mr-2" /> : null}
            {loading ? "Generating..." : "Generate Trip"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTrip

