
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Loader2, MapPin, Calendar, Users, DollarSign } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import TimelineContainer from "@/components/Timeline/TimelineContainer";
import TimelineStep from "@/components/Timeline/TimelineStep";
import AiNotification from "@/components/AiNotification";
import TipBox from "@/components/TipBox";
import Currency from "@/components/Currency";

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "draft" | "planning" | "completed";
  originCity?: string;
  travelers?: number;
  budget?: number;
  needsFlight?: boolean;
  cities?: City[];
  itinerary?: ItineraryDay[];
}

interface City {
  id: string;
  name: string;
  duration: number;
}

interface ItineraryDay {
  date: string;
  cityName: string;
  activities: Activity[];
}

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  cost: number;
  duration: string;
}

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  available: boolean;
}

const TripPlanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAiNotification, setShowAiNotification] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [generatingItinerary, setGeneratingItinerary] = useState(false);
  
  // Form state for step 1
  const [originCity, setOriginCity] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState(10000000); // in IDR
  const [needsFlight, setNeedsFlight] = useState(true);
  
  // Form state for step 3 (cities)
  const [cities, setCities] = useState<City[]>([]);
  const [newCityName, setNewCityName] = useState("");
  const [newCityDuration, setNewCityDuration] = useState(2);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        // In a real app, you would fetch from your backend
        // const response = await fetch(`http://your-backend-url/api/trips/${id}`, {...});
        
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          setTrip({
            id: id || "1",
            title: "Bali Getaway",
            destination: "Indonesia",
            startDate: "2023-12-10",
            endDate: "2023-12-20",
            status: "planning",
          });
          setLoading(false);
          
          // Show AI notification after trip is loaded
          setTimeout(() => {
            setAiMessage("I noticed you're planning a trip to Indonesia. Would you like recommendations for cities to visit based on your interests?");
            setShowAiNotification(true);
          }, 3000);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch trip details:", error);
        toast({
          title: "Error loading trip",
          description: "Could not load trip details. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const handleStepSubmit = async (step: number) => {
    try {
      switch (step) {
        case 1:
          // Save trip parameters
          setTrip(prev => prev ? {
            ...prev,
            originCity,
            travelers,
            budget,
            needsFlight,
          } : null);
          
          if (needsFlight) {
            // Simulate fetching flights
            setLoading(true);
            setTimeout(() => {
              setFlights([
                {
                  id: "f1",
                  airline: "Garuda Indonesia",
                  flightNumber: "GA-412",
                  departureTime: "08:40",
                  arrivalTime: "11:20",
                  price: 4200000,
                  available: true,
                },
                {
                  id: "f2",
                  airline: "Lion Air",
                  flightNumber: "JT-507",
                  departureTime: "10:15",
                  arrivalTime: "13:05",
                  price: 2350000,
                  available: true,
                },
                {
                  id: "f3",
                  airline: "Batik Air",
                  flightNumber: "ID-726",
                  departureTime: "14:30",
                  arrivalTime: "17:10",
                  price: 3100000,
                  available: false,
                },
              ]);
              setLoading(false);
              setCurrentStep(2);
            }, 1500);
          } else {
            // Skip flight selection step
            setCurrentStep(3);
          }
          break;
          
        case 2:
          // Save selected flight
          if (selectedFlight || !needsFlight) {
            setTrip(prev => {
              if (!prev) return null;
              return { ...prev };
            });
            
            // Proceed to city selection for country destinations
            if (trip?.destination === "Indonesia") {
              setCurrentStep(3);
            } else {
              // Skip city selection for city destinations
              setCurrentStep(4);
            }
          } else {
            toast({
              title: "Please select a flight",
              variant: "destructive",
            });
          }
          break;
          
        case 3:
          // Save selected cities
          if (cities.length === 0) {
            toast({
              title: "Please add at least one city",
              variant: "destructive",
            });
            return;
          }
          
          setTrip(prev => prev ? {
            ...prev,
            cities,
          } : null);
          
          setCurrentStep(4);
          setGeneratingItinerary(true);
          
          // Simulate generating itinerary
          setTimeout(() => {
            const itinerary: ItineraryDay[] = cities.flatMap(city => {
              const days = [];
              for (let i = 0; i < city.duration; i++) {
                days.push({
                  date: `Day ${days.length + 1}`,
                  cityName: city.name,
                  activities: [
                    {
                      id: `act-${days.length}-1`,
                      time: "08:00",
                      title: "Breakfast at local cafe",
                      description: "Enjoy traditional Indonesian breakfast",
                      cost: 75000,
                      duration: "1 hour"
                    },
                    {
                      id: `act-${days.length}-2`,
                      time: "10:00",
                      title: `Visit ${city.name} attractions`,
                      description: `Explore popular tourist spots in ${city.name}`,
                      cost: 250000,
                      duration: "4 hours"
                    },
                    {
                      id: `act-${days.length}-3`,
                      time: "15:00",
                      title: "Beach relaxation",
                      description: "Spend time at the famous beaches",
                      cost: 0,
                      duration: "3 hours"
                    },
                    {
                      id: `act-${days.length}-4`,
                      time: "19:00",
                      title: "Dinner at seafood restaurant",
                      description: "Taste fresh local seafood",
                      cost: 350000,
                      duration: "2 hours"
                    },
                  ]
                });
              }
              return days;
            });
            
            setTrip(prev => prev ? {
              ...prev,
              itinerary,
              status: "completed"
            } : null);
            
            setGeneratingItinerary(false);
          }, 4000);
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error(`Error in step ${step}:`, error);
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const addCity = () => {
    if (!newCityName.trim()) {
      toast({
        title: "Please enter a city name",
        variant: "destructive",
      });
      return;
    }
    
    const newCity: City = {
      id: `city-${Date.now()}`,
      name: newCityName,
      duration: newCityDuration,
    };
    
    setCities(prev => [...prev, newCity]);
    setNewCityName("");
    setNewCityDuration(2);
  };

  const removeCity = (cityId: string) => {
    setCities(prev => prev.filter(city => city.id !== cityId));
  };

  const calculateTotalDays = () => {
    return cities.reduce((total, city) => total + city.duration, 0);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading trip details...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!trip) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-3xl mx-auto text-center p-10 bg-white rounded-lg shadow border border-gray-200">
            <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Trip Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find the trip you're looking for.</p>
            <Button 
              onClick={() => navigate("/trips")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Back to My Trips
            </Button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {showAiNotification && (
          <AiNotification 
            message={aiMessage} 
            onDismiss={() => setShowAiNotification(false)}
          />
        )}
        
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/trips")}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Trips</span>
            </Button>
            
            <div className="text-right">
              <h1 className="text-xl font-bold text-gray-800">{trip.title}</h1>
              <p className="text-sm text-gray-600">{trip.destination}</p>
            </div>
          </div>

          <TimelineContainer>
            {/* Step 1: Trip Parameters */}
            <TimelineStep
              stepNumber={1}
              title="Trip Parameters"
              isActive={currentStep === 1}
              isCompleted={currentStep > 1}
              onClick={() => setCurrentStep(1)}
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="originCity">Origin City</Label>
                  <Input
                    id="originCity"
                    value={originCity}
                    onChange={e => setOriginCity(e.target.value)}
                    placeholder="Jakarta"
                    className="border-gray-300"
                    disabled={currentStep > 1}
                  />
                </div>
                
                <div>
                  <Label htmlFor="travelers">Number of Travelers</Label>
                  <Input
                    id="travelers"
                    type="number"
                    min={1}
                    value={travelers}
                    onChange={e => setTravelers(parseInt(e.target.value) || 1)}
                    className="border-gray-300"
                    disabled={currentStep > 1}
                  />
                </div>
                
                <div>
                  <Label htmlFor="budget">Budget (IDR)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={budget}
                    onChange={e => setBudget(parseInt(e.target.value) || 0)}
                    className="border-gray-300"
                    disabled={currentStep > 1}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Budget: <Currency amount={budget} />
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="needsFlight">Do you need a flight?</Label>
                  <Select 
                    value={needsFlight ? "yes" : "no"} 
                    onValueChange={(value) => setNeedsFlight(value === "yes")}
                    disabled={currentStep > 1}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <TipBox>
                  Set a higher budget to unlock more premium experiences in your itinerary.
                </TipBox>
                
                {currentStep === 1 && (
                  <div className="pt-2">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleStepSubmit(1)}
                    >
                      Next: {needsFlight ? "Select Flight" : "Choose Cities"}
                    </Button>
                  </div>
                )}
              </div>
            </TimelineStep>
            
            {/* Step 2: Flight Selection (conditional) */}
            {(needsFlight && (currentStep >= 2 || trip.needsFlight === false)) && (
              <TimelineStep
                stepNumber={2}
                title="Flight Selection"
                isActive={currentStep === 2}
                isCompleted={currentStep > 2}
                onClick={() => currentStep > 2 ? setCurrentStep(2) : null}
              >
                <div className="space-y-4">
                  {flights.length > 0 ? (
                    <div className="space-y-3">
                      {flights.map(flight => (
                        <div 
                          key={flight.id}
                          className={`p-3 border rounded-md cursor-pointer ${
                            flight.available 
                              ? selectedFlight === flight.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-blue-200'
                              : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                          }`}
                          onClick={() => flight.available && setSelectedFlight(flight.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{flight.airline}</p>
                              <p className="text-sm text-gray-500">Flight {flight.flightNumber}</p>
                            </div>
                            <p className="font-medium">
                              <Currency amount={flight.price} />
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-sm">
                              <span className="font-medium">{flight.departureTime}</span> - <span className="font-medium">{flight.arrivalTime}</span>
                            </div>
                            <div>
                              {!flight.available && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs">
                                  Unavailable
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <TipBox>
                        Early morning flights are usually cheaper but consider your travel time to the airport.
                      </TipBox>
                      
                      {currentStep === 2 && (
                        <div className="pt-2">
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleStepSubmit(2)}
                            disabled={!selectedFlight && trip.needsFlight !== false}
                          >
                            Next: Choose Cities
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">No flights found.</p>
                    </div>
                  )}
                </div>
              </TimelineStep>
            )}
            
            {/* Step 3: City Selection (conditional for countries) */}
            {(trip.destination === "Indonesia" || currentStep >= 3) && (
              <TimelineStep
                stepNumber={needsFlight ? 3 : 2}
                title="City Selection"
                isActive={currentStep === 3}
                isCompleted={currentStep > 3}
                onClick={() => currentStep > 3 ? setCurrentStep(3) : null}
              >
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
                    Add cities you want to visit in {trip.destination} and specify how many days you'll stay in each city.
                  </div>
                  
                  <div className="space-y-3">
                    {cities.map(city => (
                      <div key={city.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
                        <div>
                          <p className="font-medium">{city.name}</p>
                          <p className="text-sm text-gray-500">{city.duration} {city.duration === 1 ? 'day' : 'days'}</p>
                        </div>
                        {currentStep === 3 && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeCity(city.id)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {cities.length > 0 && (
                    <div className="text-sm flex justify-between items-center py-2 border-t border-gray-200 mt-3">
                      <span>Total duration:</span>
                      <span className="font-medium">{calculateTotalDays()} days</span>
                    </div>
                  )}
                  
                  {currentStep === 3 && (
                    <>
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="text-sm font-medium mb-2">Add a City</div>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <Label htmlFor="cityName" className="sr-only">City Name</Label>
                            <Input
                              id="cityName"
                              value={newCityName}
                              onChange={e => setNewCityName(e.target.value)}
                              placeholder="City name"
                              className="border-gray-300"
                            />
                          </div>
                          <div>
                            <Label htmlFor="duration" className="sr-only">Duration (days)</Label>
                            <Input
                              id="duration"
                              type="number"
                              min={1}
                              value={newCityDuration}
                              onChange={e => setNewCityDuration(parseInt(e.target.value) || 1)}
                              className="border-gray-300 w-24"
                            />
                          </div>
                          <Button onClick={addCity} className="bg-blue-600 hover:bg-blue-700">
                            Add
                          </Button>
                        </div>
                      </div>
                      
                      <TipBox>
                        Consider spending at least 2 days in major cities to fully experience them.
                      </TipBox>
                      
                      <div className="pt-2">
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleStepSubmit(3)}
                          disabled={cities.length === 0}
                        >
                          Generate Itinerary
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </TimelineStep>
            )}
            
            {/* Step 4: Itinerary Display */}
            {currentStep === 4 && (
              <TimelineStep
                stepNumber={needsFlight && trip.destination === "Indonesia" ? 4 : (needsFlight ? 3 : 2)}
                title="Generated Itinerary"
                isActive={currentStep === 4}
                isCompleted={false}
                onClick={() => {}}
              >
                {generatingItinerary ? (
                  <div className="text-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
                    <p className="text-gray-700">Generating your personalized itinerary...</p>
                    <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
                  </div>
                ) : trip.itinerary ? (
                  <div className="space-y-6">
                    {trip.itinerary.map((day, index) => (
                      <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{day.date}</h3>
                            <span className="text-sm text-gray-600">{day.cityName}</span>
                          </div>
                        </div>
                        
                        <div className="divide-y divide-gray-100">
                          {day.activities.map(activity => (
                            <div key={activity.id} className="p-3">
                              <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-gray-600">
                                    {activity.time}
                                  </span>
                                  <h4 className="font-medium">{activity.title}</h4>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">
                                    <Currency amount={activity.cost} />
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">{activity.description}</p>
                              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                <span>{activity.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {/* Summary card */}
                    <Card className="mt-6">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Destination</p>
                              <p className="font-medium">{trip.destination}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Duration</p>
                              <p className="font-medium">{calculateTotalDays()} days</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Travelers</p>
                              <p className="font-medium">{trip.travelers}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Budget</p>
                              <p className="font-medium"><Currency amount={trip.budget || 0} /></p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 mt-4">
                          <Button 
                            variant="outline" 
                            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                            onClick={() => setCurrentStep(1)}
                          >
                            Edit Plan
                          </Button>
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                            Save Itinerary
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No itinerary generated yet.</p>
                  </div>
                )}
              </TimelineStep>
            )}
          </TimelineContainer>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TripPlanner;
