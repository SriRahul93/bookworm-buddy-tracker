
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
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useLibrary } from "@/contexts/LibraryContext";
import { CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["student", "admin"]).default("student"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onCreateAccount: () => void;
}

const LoginForm = ({ onCreateAccount }: LoginFormProps) => {
  const { login, isLoading } = useLibrary();
  const [loginRole, setLoginRole] = useState<"student" | "admin">("student");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  });

  // Update form value when role toggle changes
  const handleRoleChange = (newRole: "student" | "admin") => {
    setLoginRole(newRole);
    form.setValue("role", newRole);
  };

  // Handle login form submission
  const handleSubmit = async (values: LoginFormValues) => {
    try {
      // Set local submitting state
      setIsSubmitting(true);
      await login(values.email, values.password);
    } catch (error) {
      // Error is handled in the login function
      console.error("Login error:", error);
    } finally {
      // Reset submitting state in case login fails
      setIsSubmitting(false);
    }
  };

  // Use our local submitting state or the global loading state
  const buttonIsLoading = isSubmitting || isLoading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardHeader>
          <CardTitle>Account Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Role toggle */}
          <div className="flex flex-col space-y-2">
            <FormLabel>I am a:</FormLabel>
            <div className="flex justify-between items-center p-2 rounded-md border bg-gray-50">
              <span className={`text-sm font-medium ${loginRole === "student" ? "text-primary" : "text-gray-500"}`}>
                Student
              </span>
              <Switch 
                checked={loginRole === "admin"}
                onCheckedChange={(checked) => handleRoleChange(checked ? "admin" : "student")}
              />
              <span className={`text-sm font-medium ${loginRole === "admin" ? "text-primary" : "text-gray-500"}`}>
                Admin
              </span>
            </div>
          </div>
          
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
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <a
                    href="#"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
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
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={buttonIsLoading}
          >
            {buttonIsLoading ? "Signing in..." : "Sign In"}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onCreateAccount}
            disabled={false}
          >
            Create an account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default LoginForm;
