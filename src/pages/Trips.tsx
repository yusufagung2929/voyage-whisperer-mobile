
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, PlusCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "draft" | "planning" | "completed";
  coverImage?: string;
}

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        // In a real app, you would fetch from your backend
        // const response = await fetch("http://your-backend-url/api/trips",...);
        
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          setTrips([
            {
              id: "1",
              title: "Tokyo Adventure",
              destination: "Japan",
              startDate: "2023-10-15",
              endDate: "2023-10-25",
              status: "completed",
              coverImage: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&q=80&w=1400",
            },
            {
              id: "2",
              title: "Bali Getaway",
              destination: "Indonesia",
              startDate: "2023-12-10",
              endDate: "2023-12-20",
              status: "planning",
              coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1400",
            },
          ]);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Trips</h1>
              <p className="text-gray-600">
                Manage and plan your upcoming adventures
              </p>
            </div>
            <Button 
              onClick={() => navigate("/trips/new")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Trip
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : trips.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No trips yet</h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                Create your first trip and start planning your adventure with AI assistance
              </p>
              <Button 
                onClick={() => navigate("/trips/new")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Your First Trip
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden border border-gray-200">
                  {trip.coverImage && (
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={trip.coverImage} 
                        alt={trip.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  )}
                  <CardHeader className={trip.coverImage ? "pt-3" : ""}>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{trip.title}</CardTitle>
                        <CardDescription>{trip.destination}</CardDescription>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs uppercase font-medium ${
                        trip.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        trip.status === 'planning' ? 'bg-blue-100 text-blue-800' : 
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {trip.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {formatDateRange(trip.startDate, trip.endDate)}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/trips/${trip.id}/plan`} className="w-full">
                      <Button 
                        variant={trip.status === 'completed' ? 'outline' : 'default'} 
                        className={`w-full ${
                          trip.status === 'completed' 
                            ? 'border-blue-600 text-blue-600 hover:bg-blue-50' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {trip.status === 'completed' ? 'View Details' : 'Continue Planning'}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="border-dashed border-gray-300 bg-transparent flex items-center justify-center">
                <Button 
                  variant="ghost" 
                  className="w-full h-full py-20 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate("/trips/new")}
                >
                  <div className="flex flex-col items-center gap-2">
                    <PlusCircle className="h-10 w-10" />
                    <span>Create New Trip</span>
                  </div>
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Trips;
