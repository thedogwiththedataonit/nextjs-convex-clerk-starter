import { currentUser } from '@clerk/nextjs/server'
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Shield, Zap } from "lucide-react";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 animate-gradient">
            Next.js + Convex + Clerk
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Build powerful, real-time applications with the perfect stack for modern web development
          </p>
          <div className="flex justify-center gap-4">
            <SignInButton 
            >
              <Button size="lg" >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
            <Zap className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-muted-foreground">
              Convex provides instant, real-time updates across your application with zero configuration
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
            <p className="text-muted-foreground">
              Clerk handles authentication with enterprise-grade security and beautiful UI components
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
            <Database className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Serverless Backend</h3>
            <p className="text-muted-foreground">
              Build your backend with TypeScript and deploy instantly with zero DevOps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
