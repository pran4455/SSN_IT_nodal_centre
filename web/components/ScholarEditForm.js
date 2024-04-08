'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"

import ScholarDetail from "@/components/ScholarDetail"

import { ImageUp, SquarePen } from 'lucide-react';

import { Button, buttonVariants } from "@/components/ui/button";
import Image from 'next/image'
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function ScholarEditForm({ scholar }) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="gap-2 w-full justify-between">
                    Edit
                    <SquarePen className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl overflow-y-auto h-[75vh] flex flex-col gap-8" onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className='col-span-3 font-semibold text-3xl'>
                    Edit Scholar Information
                </div>

                <div className='grid grid-cols-2 gap-x-4 gap-y-2'>

                    {/* <div className="relative p-2 bg-white rounded-xl shadow-md w-[250px] h-[250px]">
                        <Image src={"https://avatars.githubusercontent.com/u/124599?v=4"} width={250} height={250} className="rounded-lg aspect-square" />

                        <div className={buttonVariants({ variant: "outline", size: "icon", className: "absolute bottom-0 right-0 m-3" })}>
                            <ImageUp className="w-4 h-4" />
                        </div>
                    </div> */}

                    <ScholarDetail key={"name"} title={"Name"} data={scholar.name} />
                    <ScholarDetail key={"gender"} title={"Gender"} data={scholar.gender} />
                    <ScholarDetail key={"category"} title={"Category"} data={scholar.category} />
                    <ScholarDetail key={"university"} title={"University"} data={scholar.university} />

                </div>

                <div className='grid grid-cols-2 gap-x-4 gap-y-2'>

                    <ScholarDetail key={"guide"} title={"Guide Name"} data={scholar.guide} />

                    <ScholarDetail key={"completed"} title={"PhD Completed"} data={scholar.completed} />
                    <ScholarDetail key={"registration_date"} title={"Registration Date"} data={scholar.registration_date} />
                    <ScholarDetail key={"viva_voice_date"} title={"Viva Voice Date"} data={scholar.viva_voice_date} type="date" />
                    <ScholarDetail key={"research_title"} title={"Research Title"} data={scholar.research_title} className="col-span-2" />

                </div>

                <div className='grid grid-cols-2 gap-x-4 gap-y-2'>

                    <ScholarDetail key={"study_type"} title={"Study Type"} data={scholar.study_type} />
                    <ScholarDetail key={"fellowship"} title={"Fellowship"} data={scholar.fellowship} />

                    <ScholarDetail key={"pg_college"} title="PG College" data={scholar.pg_college} />
                    <ScholarDetail key={"pg_graduating_year"} title="PG Graduation Year" data={scholar.pg_graduating_year} />

                    <ScholarDetail key={"ug_graduating_year"} title="UG Graduation Year" data={scholar.ug_graduating_year} />
                    <ScholarDetail key={"ug_college"} title="UG College" data={scholar.ug_college} />
                </div>


            </DialogContent>
        </Dialog>
    )
}
