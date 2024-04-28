import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import Link from "next/link"

import { scholarQueryBuilder, supabase } from "@/lib/server"

export default async function OverviewPage() {

  const { count: UsersCompleted, } = await supabase()
    .from('scholars')
    .select('*', { count: 'exact', head: true })
    .eq('status', true)

  const { count: UsersNotCompleted } = await supabase()
    .from('scholars')
    .select('*', { count: 'exact', head: true })
    .eq('status', false)

  const data = [
    {
      title: 'Ongoing Researchers',
      count: UsersNotCompleted,
      link: "/dashboard/scholars?status=Not Completed"
    },
    {
      title: 'PhD Completed',
      count: UsersCompleted,
      link: "/dashboard/scholars?status=Completed"
    },
  ]

  const { data: filters } = await supabase()
    .from('scholar_filters')
    .select('*,label(id,color)')


  const allFilters = await Promise.all(filters.map(async (filter) => {
    const { data, error, count } = await scholarQueryBuilder(filter.filter, true)

    if (error) {
      console.log(error)
    }

    const params = new URLSearchParams(filter.filter).toString()

    return { filter, data, count, params }
  }));



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


        {allFilters.map((data, index) =>
          <Card key={index} className={`flex flex-col justify-between rounded-2xl`} style={{ backgroundColor: data.filter.label.color }}>
            <CardHeader className="flex flex-1 pb-2">
              <CardTitle className="font-bold sm:text-xl">{data.filter.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col-reverse sm:flex-row justify-between items-end">
              <Link className="opacity-80 hover:underline text-xs sm:text-base" href={`/dashboard/scholars?${data.params}` || "#"}>
                Show More
              </Link>
              <p className="font-bold sm:text-5xl">{data?.count.toString().padStart(2, '0')}</p>
            </CardContent>
          </Card>
        )}


      </div>
    </>
  )
}

