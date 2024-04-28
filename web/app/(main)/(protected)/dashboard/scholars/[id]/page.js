import { supabase } from "@/lib/server"

import Image from 'next/image'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Download, Trash2 } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import ScholarDetailPreview from "@/components/ScholarDetailPreview";
import ScholarEditForm from "@/components/ScholarEditForm";


export default async function Page({ params: { id } }) {

    const { data, error } = await supabase().from('scholars').select('*,scholar_details(*)')
        .eq('register_number', id)
        .single()


    if (error) {
        return (
            <pre>
                {JSON.stringify(error.message)}
            </pre>
        )
    }

    const { scholar_details: { ...restScholarDetails }, ...rest } = data;

    const _scholar = {
        ...rest,
        ...restScholarDetails
    };

    const scholar = Object.fromEntries(
        Object.entries(_scholar).map(([key, value]) => [key, value === null ? '' : value])
    );

    return (
        <section className="sm:max-w-[85%] mx-auto">
            <Breadcrumb>
                <BreadcrumbList className="text-md">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/scholars">Scholars</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{scholar.register_number}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="sm:flex gap-4 mt-7">
                <div>
                    <div className="sticky top-[64px] w-[250px] col-span-1 pb-2 space-y-4">

                        {/* <div className="relative w-full p-2 bg-white rounded-xl shadow-md">
                            <Image src="https://avatars.githubusercontent.com/u/124599?v=4" width={250} height={250} className="rounded-lg aspect-square" />
                        </div> */}

                        <div className="bg-white rounded-xl px-4 py-1 shadow">
                            <span className="text-xs font-medium text-black/80">
                                Name
                            </span>
                            <p className="font-bold">
                                {scholar.name}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl px-4 py-1 shadow">
                            <span className="text-xs font-medium text-black/80">
                                Register Number
                            </span>
                            <p className="font-bold">
                                {scholar.register_number}
                            </p>
                        </div>

                        <div className="py-4 col-span-2 bg-white rounded-xl shadow">
                            <p className="px-4 text-lg font-medium">Quick Actions</p>

                            <ul className="flex flex-col">
                                <li>
                                    <ScholarEditForm scholar={scholar} />
                                </li>
                                <li>
                                    <Button variant="link" className="gap-2 w-full justify-between">
                                        Export
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </li>
                                <li>
                                    <Button variant="link" className="text-destructive gap-2 w-full justify-between">
                                        Delete Record
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* <div className="w-full py-4 overflow-y-auto bg-white rounded-xl shadow-md">

                    <div className="text-3xl font-bold col-span-2 px-8 my-3">
                        About
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-y-8 px-8 my-4">

                        <ScholarDetailPreview label={"Gender"} data={scholar.gender} />
                        <ScholarDetailPreview label={"Category"} data={scholar.category} />
                        <ScholarDetailPreview label={"Fellowship"} data={scholar.fellowship} />
                        <ScholarDetailPreview label={"Study Type"} data={scholar.study_type} />
                        <ScholarDetailPreview label={"University"} data={scholar.university} className="col-span-2" />
                        <ScholarDetailPreview label={"Registration Date"} data={scholar.registration_date} />
                        <ScholarDetailPreview label={"Viva Voice Date"} data={scholar.viva_voice_date} />

                    </div>


                    <Separator />

                    <div className="grid grid-cols-2 gap-4 px-8 my-6">
                        <div className="col-span-2 text-2xl font-bold">PhD Status</div>

                        <ScholarDetailPreview label={"Guide"} data={scholar.guide} />
                        <ScholarDetailPreview label={"Status"} data={scholar.status} />
                        <ScholarDetailPreview label={"Status of Research"} data={scholar.status_of_research} className="col-span-2" />
                        <ScholarDetailPreview label={"Research Title"} data={scholar.research_title} className="col-span-2" />
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4 px-8 py-4">
                        <div className="col-span-2 text-2xl font-bold">Other</div>

                        <ScholarDetailPreview label={"UG College"} data={scholar.ug_college} />
                        <ScholarDetailPreview label={"UG Graduating Year"} data={scholar.ug_graduating_year} />

                        <ScholarDetailPreview label={"PG College"} data={scholar.pg_college} />
                        <ScholarDetailPreview label={"PG Graduating Year"} data={scholar.pg_graduating_year} />

                        <ScholarDetailPreview label={"Working at SSN"} data={scholar.working_at_ssn} />
                    </div>

                </div> */}
                <div className="sm:grid grid-cols-4 gap-4 w-full overflow-y-auto rounded-xl sm:rounded-none">

                    <div className="col-span-4 grid grid-cols-2 gap-4 px-8 py-6 bg-white sm:rounded-xl shadow-md">
                        <div className="text-3xl font-bold col-span-2">
                            About
                        </div>
                        <Separator className="col-span-2" />

                        <ScholarDetailPreview label={"Gender"} data={scholar.gender} />
                        <ScholarDetailPreview label={"Category"} data={scholar.category} />
                        <ScholarDetailPreview label={"Fellowship"} data={scholar.fellowship} />
                        <ScholarDetailPreview label={"Study Type"} data={scholar.study_type} />
                        <ScholarDetailPreview label={"University"} data={scholar.university} className="col-span-2" />
                        <ScholarDetailPreview label={"Registration Date"} data={scholar.registration_date} />
                        <ScholarDetailPreview label={"Viva Voice Date"} data={scholar.viva_voice_date} />

                    </div>


                    <div className="col-span-2 grid grid-cols-2 gap-4 px-8 py-6 bg-white sm:rounded-xl shadow-md">
                        <div className="col-span-2 text-2xl font-bold">PhD Status</div>

                        <ScholarDetailPreview label={"Guide"} data={scholar.guide} />
                        <ScholarDetailPreview label={"Status"} data={scholar.status} />
                        <ScholarDetailPreview label={"Status of Research"} data={scholar.status_of_research} className="col-span-2" />
                        <ScholarDetailPreview label={"Research Title"} data={scholar.research_title} className="col-span-2" />
                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-4 px-8 py-6 bg-white sm:rounded-xl shadow-md">
                        <div className="col-span-2 text-2xl font-bold">Other</div>

                        <ScholarDetailPreview label={"UG College"} data={scholar.ug_college} />
                        <ScholarDetailPreview label={"UG Graduating Year"} data={scholar.ug_graduating_year} />

                        <ScholarDetailPreview label={"PG College"} data={scholar.pg_college} />
                        <ScholarDetailPreview label={"PG Graduating Year"} data={scholar.pg_graduating_year} />

                        <ScholarDetailPreview label={"Working at SSN"} data={scholar.working_at_ssn} />
                    </div>

                </div>

            </div>

            {/* <pre className="border bg-white p-2 rounded-2xl w-min mt-10">
                {JSON.stringify(scholar, null, 4)}
            </pre> */}
        </section>
    )
}
