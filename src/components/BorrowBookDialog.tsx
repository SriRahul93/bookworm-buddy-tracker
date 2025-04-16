
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
import { supabase } from "@/integrations/supabase/client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

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
  const [studentVerified, setStudentVerified] = useState(false);
  const [showVerificationFailure, setShowVerificationFailure] = useState(false);
  
  // Form definition
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: book.department || "",
      course: book.course || "",
      rollNo: "",
    },
  });
  
  // Verify student details against database
  const verifyStudent = async (values: FormValues): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Check if student exists with given roll number in the profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('student_id', values.rollNo)
        .eq('role', 'student')
        .single();
      
      if (error || !data) {
        console.error("Student verification error:", error);
        return false;
      }
      
      // Student found
      return true;
    } catch (error) {
      console.error("Error verifying student:", error);
      return false;
    }
  };
  
  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast.error("You need to login first!");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Verify student details
      const isStudentVerified = await verifyStudent(values);
      
      if (!isStudentVerified) {
        setShowVerificationFailure(true);
        setIsSubmitting(false);
        return;
      }
      
      setStudentVerified(true);
      
      // Call the borrowBook function from LibraryContext
      await borrowBook(book.id);
      
      // Show confirmation
      setShowConfirmation(true);
      
      // Store the student details as metadata
      // Note: We're not using student_details as it's not in the types
      await supabase.from('issued_books')
        .update({
          // Store values in separate metadata columns or use existing columns
          // We'll use comments to represent this since there's no actual column in the schema
          // In a real implementation, we would need to add these columns to the schema
        })
        .eq('book_id', book.id)
        .eq('user_id', user.id);
      
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
      setStudentVerified(false);
      form.reset();
    }
    onOpenChange(false);
  };
  
  const handleVerificationFailureClose = () => {
    setShowVerificationFailure(false);
  };
  
  return (
    <>
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
                      {isSubmitting ? "Verifying..." : "Submit"}
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
      
      <AlertDialog open={showVerificationFailure} onOpenChange={handleVerificationFailureClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Verification Failed</AlertDialogTitle>
            <AlertDialogDescription>
              We couldn't verify your student details. Please check your roll number and try again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleVerificationFailureClose}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BorrowBookDialog;
