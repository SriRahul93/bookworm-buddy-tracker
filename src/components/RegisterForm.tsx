
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Lock, IdCard, ArrowLeft } from "lucide-react";
import { useLibrary } from "@/contexts/LibraryContext";
import { CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Registration form schema
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["student", "admin"]).default("student"),
  studentId: z.string().optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onBackToLogin: () => void;
}

const RegisterForm = ({ onBackToLogin }: RegisterFormProps) => {
  const { register, isLoading } = useLibrary();
  const [registerRole, setRegisterRole] = useState<"student" | "admin">("student");
  
  // Register form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
      studentId: "",
    },
  });

  // Update form value when role toggle changes
  const handleRoleChange = (newRole: "student" | "admin") => {
    setRegisterRole(newRole);
    form.setValue("role", newRole);
  };

  // Handle registration form submission
  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      await register(
        values.email, 
        values.password, 
        values.name, 
        values.role, 
        values.studentId
      );
    } catch (error) {
      // Error is handled in the register function
      console.error("Registration error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Register to access the LibTrack system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Role toggle */}
          <div className="flex flex-col space-y-2">
            <FormLabel>I am a:</FormLabel>
            <div className="flex justify-between items-center p-2 rounded-md border bg-gray-50">
              <span className={`text-sm font-medium ${registerRole === "student" ? "text-primary" : "text-gray-500"}`}>
                Student
              </span>
              <Switch 
                checked={registerRole === "admin"}
                onCheckedChange={(checked) => handleRoleChange(checked ? "admin" : "student")}
              />
              <span className={`text-sm font-medium ${registerRole === "admin" ? "text-primary" : "text-gray-500"}`}>
                Admin
              </span>
            </div>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input 
                      className="pl-10" 
                      placeholder="John Doe" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input className="pl-10" placeholder="your.email@example.com" type="email" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input className="pl-10" placeholder="••••••••" type="password" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {registerRole === "student" && (
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input className="pl-10" placeholder="S12345" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onBackToLogin}
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default RegisterForm;
