
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to trips
    if (user) {
      navigate("/trips");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 mb-6 bg-blue-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-gray-800">TripPlanner AI</h1>
        <p className="text-xl text-gray-600 mb-8">
          Create personalized trip itineraries with AI assistance
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
            Plan Your Perfect Trip with AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Time-Saving Planning</h3>
              <p className="text-gray-600">Generate complete itineraries in seconds with our AI assistant</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Step-by-Step Timeline</h3>
              <p className="text-gray-600">Visualize your trip planning process with our intuitive timeline interface</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Smart Suggestions</h3>
              <p className="text-gray-600">Receive real-time recommendations based on your preferences and budget</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
