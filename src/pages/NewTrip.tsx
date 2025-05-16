
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  destination: z.string().min(2, { message: "Please enter a destination" }),
  startDate: z.string().min(1, { message: "Please select a start date" }),
  endDate: z.string().min(1, { message: "Please select an end date" }),
  notes: z.string().optional(),
});

const NewTrip = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      destination: "",
      startDate: "",
      endDate: "",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would send this to your backend
      // await fetch("http://your-backend-url/api/trips", {...})
      
      // For demo purposes, we'll simulate a successful API call
      setTimeout(() => {
        toast({
          title: "Trip created successfully!",
          description: "You can now start planning your adventure.",
        });
        navigate("/trips");
      }, 1500);
    } catch (error) {
      console.error("Failed to create trip:", error);
      toast({
        title: "Error creating trip",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto p-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/trips")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Trips
          </Button>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Create a New Trip</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trip Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Summer Vacation 2023" 
                          {...field} 
                          className="border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tokyo, Japan" 
                          {...field} 
                          className="border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            className="border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            className="border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any special requests or ideas for this trip..." 
                          {...field} 
                          className="border-gray-300 resize-none"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Trip...
                      </>
                    ) : (
                      "Create Trip"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NewTrip;
