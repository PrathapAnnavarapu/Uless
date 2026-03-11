import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ConfigInstructions() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Supabase Configuration Instructions</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>How to Configure Supabase & Backend</CardTitle>
          <CardDescription>Follow these steps to configure your Supabase credentials and point the frontend at the Flask API</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-4">
            <li>
              <p className="font-medium">Find your Supabase credentials:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Go to your Supabase dashboard</li>
                <li>Navigate to Project Settings &gt; API</li>
                <li>Copy your "Project URL" and "anon public" key</li>
              </ul>
            </li>
            <li>
              <p className="font-medium">Set backend API URL:</p>
              <div className="bg-gray-100 p-4 rounded-md mt-2 overflow-x-auto">
                <pre className="text-sm">
{`// set this in your .env or Vercel env vars
env NEXT_PUBLIC_BACKEND_URL="http://localhost:5000"`}
                </pre>
              </div>
            </li>

            <li>
              <p className="font-medium">Edit the config.js file:</p>
              <div className="bg-gray-100 p-4 rounded-md mt-2 overflow-x-auto">
                <pre className="text-sm">
                  {`// IMPORTANT: Replace these values with your actual Supabase credentials
export const SUPABASE_URL = "https://your-project-url.supabase.co"
export const SUPABASE_ANON_KEY = "your-anon-key"

// Set this to true once you've added your credentials
export const IS_CONFIGURED = false`}
                </pre>
              </div>
              <p className="mt-2">
                Replace the placeholder values with your actual credentials and set IS_CONFIGURED to true
              </p>
            </li>

            <li>
              <p className="font-medium">Save the file and refresh your application</p>
            </li>
          </ol>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alternative: Deploy to Vercel</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            If you're having trouble with local configuration, you can deploy your application to Vercel and set the
            environment variables there:
          </p>
          <ol className="list-decimal pl-5 mt-4 space-y-2">
            <li>Deploy your application to Vercel</li>
            <li>Go to your project settings in Vercel</li>
            <li>
              Add environment variables <code className="bg-gray-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="bg-gray-100 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
            </li>
            <li>Redeploy your application</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
