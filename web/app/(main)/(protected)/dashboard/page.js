import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import Link from "next/link"

export default async function OverviewPage() {

  const data = [
    {
      title: 'Ongoing Researchers',
      count: 7,
      link: "/dashboard/scholars"
    },
    {
      title: 'PhD Completed',
      count: 10,
      link: "#"
    },
  ]

  const SavedFilterFormats = [
    {
      title: 'Last 2 years',
      count: 3,
      link: "#",
      color: 'bg-yellow-500/50'
    },
    {
      title: 'PG Completed from Anna University',
      count: 4,
      link: "#",
      color: '#22c55e'
    },
    {
      title: 'Under Age 27',
      count: 1,
      link: "#",
      color: 'bg-indigo-500/50'
    },
    {
      title: 'Junior Research Fellowship',
      count: 4,
      link: "#",
      color: 'bg-blue-500/50'
    },
    {
      title: 'Senior Research Fellowship',
      count: 2,
      link: "#",
      color: '#FF5757'
    },
    {
      title: 'Others',
      count: 4,
      link: "#"
    },
    {
      title: 'Currently Working at SSN',
      count: 2,
      link: "#",
      color: 'bg-blue-500/50'
    },
  ]

  return (
    <>
      <h2 className="text-3xl font-bold border p-6 border-muted-foreground/30 rounded-xl bg-[#dde9ec]">
        Overview
      </h2>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
        {data.map((data, index) =>
          <Card key={index} className="shadow-sm rounded-2xl flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="font-bold sm:text-xl">{data.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col-reverse sm:flex-row justify-between items-end">
              <Link className="opacity-80 hover:underline text-xs sm:text-base" href={data.link || "#"}>
                Show More
              </Link>
              <p className="font-bold sm:text-5xl">{data.count.toString().padStart(2, '0')}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <h3 className="text-2xl font-bold mt-8">
        Saved Filters
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4">
        {SavedFilterFormats.map((data, index) =>
          <Card key={index} className={`flex flex-col justify-between rounded-2xl ${data.color}`} style={{ backgroundColor: data.color }}>
            <CardHeader className="flex flex-1 pb-2">
              <CardTitle className="font-bold sm:text-xl">{data.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col-reverse smLflex-row justify-between items-end">
              <Link className="opacity-80 hover:underline text-xs sm:text-base" href={data.link || "#"}>
                Show More
              </Link>
              <p className="font-bold sm:text-5xl">{data.count.toString().padStart(2, '0')}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}

