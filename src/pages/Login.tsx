
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLibrary } from "@/contexts/LibraryContext";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, login } = useLibrary();
  const navigate = useNavigate();

  // If user is already logged in, redirect to appropriate dashboard
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <BookOpen className="h-12 w-12 text-library-purple" />
          </div>
          <h2 className="mt-3 text-3xl font-bold gradient-text">
            Welcome to LibTrack
          </h2>
          <p className="mt-2 text-gray-600">
            Sign in to manage your library books and fines.
          </p>
        </div>

        <Card className="shadow-lg animate-fade-in border-none">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Account Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your dashboard.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="text-xs text-library-purple hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full gradient-bg hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="demo">
              <CardHeader>
                <CardTitle>Demo Accounts</CardTitle>
                <CardDescription>
                  Use these accounts to explore LibTrack features.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm font-semibold">Student Account:</p>
                    <p className="text-sm text-gray-600">student@example.com</p>
                    <p className="text-sm text-gray-600">password</p>
                  </div>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      setEmail("student@example.com");
                      setPassword("password");
                    }}
                  >
                    Use Student Account
                  </Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm font-semibold">Admin Account:</p>
                    <p className="text-sm text-gray-600">admin@example.com</p>
                    <p className="text-sm text-gray-600">password</p>
                  </div>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      setEmail("admin@example.com");
                      setPassword("password");
                    }}
                  >
                    Use Admin Account
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} LibTrack • All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
