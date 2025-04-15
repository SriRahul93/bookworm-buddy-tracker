
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Book } from "@/types/book";
import { useLibrary } from "@/contexts/LibraryContext";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface BorrowBookDialogProps {
  book: Book;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Form schema with validation
const formSchema = z.object({
  department: z.string().min(2, { message: "Department is required" }),
  course: z.string().min(2, { message: "Course is required" }),
  rollNo: z.string().min(2, { message: "Roll number is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const BorrowBookDialog = ({ book, open, onOpenChange }: BorrowBookDialogProps) => {
  const { user, borrowBook } = useLibrary();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Form definition
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: "",
      course: "",
      rollNo: "",
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast.error("You need to login first!");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would validate these values against a database
      // For demo, we'll just simulate a delay and success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Borrow the book
      await borrowBook(book.id);
      
      // Show confirmation
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error("Failed to borrow book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
    if (showConfirmation) {
      // Reset the dialog state
      setShowConfirmation(false);
      form.reset();
    }
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {!showConfirmation ? (
          <>
            <DialogHeader>
              <DialogTitle>Borrow Book</DialogTitle>
              <DialogDescription>
                Please enter your department, course, and roll number to borrow "{book.title}".
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Web Development" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rollNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roll Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. CS2023-021" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleClose} 
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Submit"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-green-600">Success!</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center">
              <div className="mb-4 mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Congratulations {user?.name}!
              </h3>
              <p className="text-gray-600 mb-6">
                You can collect the physical copy of "{book.title}" from the library tomorrow.
              </p>
              <Button onClick={handleClose} className="w-full">Done</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookDialog;
