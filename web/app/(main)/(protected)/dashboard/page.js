import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import Link from "next/link"

import { recursivelySetEmptyToNotSet, supabase } from "@/lib/server"

export default async function OverviewPage() {


  const { data: _scholars, error } = await supabase().from('scholars').select('*,scholar_details(*)')

  const scholars = _scholars.map((scholar) => {
    const _scholar = recursivelySetEmptyToNotSet(scholar);
    _scholar.completed = scholar.completed === "Y" ? "Completed" : "Not Completed"

    const scholar_details = _scholar.scholar_details
    delete _scholar.scholar_details;

    return { ..._scholar, ...scholar_details }
  })

  const UsersCompleted = scholars.filter((scholar) => scholar.completed === 'Completed').length

  const UsersNotCompleted = scholars.filter((scholar) => scholar.completed === 'Not Completed').length

  const SRFfellowship = scholars.filter((scholar) => scholar.fellowship === 'SRF').length

  const JRFfellowship = scholars.filter((scholar) => scholar.fellowship === 'JRF').length

  const working_at_ssn = scholars.filter((scholar) => scholar.working_at_ssn === 'Y').length

  const lastDecade = scholars.filter((scholar) => {
    if (scholar?.registration_date !== 'Not Set') {
      return new Date(scholar.registration_date) >= new Date('2010-01-01') && new Date(scholar.registration_date) <= new Date();
    }
  }).length

  const fulltime = scholars.filter((scholar) => scholar.study_type === 'FT').length
  const parttime = scholars.filter((scholar) => scholar.study_type === 'PT').length


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

  const SavedFilterFormats = [
    {
      title: 'From 2010 to 2020',
      count: lastDecade,
      link: "#",
      color: 'bg-yellow-500/50'
    },
   
    {
      title: 'Junior Research Fellowship',
      count: JRFfellowship,
      link: "/dashboard/scholars?fellowship=JRF",
      color: '#22c55e'
    },
    {
      title: 'Senior Research Fellowship',
      count: SRFfellowship,
      link: "/dashboard/scholars?fellowship=SRF",
      color: '#FF5757'
    },
    {
      title: 'Currently Working at SSN',
      count: working_at_ssn,
      link: "#",
      color: 'bg-blue-500/50'
    },
    {
      title: 'Full Time',
      count: fulltime,
      link: "/dashboard/scholars?study_type=FT",
      color: '#eab308'
    },
    {
      title: 'Part Time',
      count: parttime,
      link: "/dashboard/scholars?study_type=PT",
      color: '#6366f1'
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

