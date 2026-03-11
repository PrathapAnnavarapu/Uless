import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function GuidesLoading() {
  return (
    <main className="flex-1">
      {/* Hero Section Skeleton */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#f8faff] to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="h-12 w-64 bg-gray-200 rounded animate-pulse mx-auto" />
              <div className="h-6 w-96 bg-gray-200 rounded animate-pulse mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides Skeleton */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
