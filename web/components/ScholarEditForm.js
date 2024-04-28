'use client'
import React from "react";

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import ScholarDetail from "@/components/ScholarDetail"

import { SquarePen } from 'lucide-react';

import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { scholarSchema } from "@/validations/scholar";
import { motion } from 'framer-motion'

import useToggleState from "@/hooks/useTogleState";
import { Separator } from "./ui/separator";


// Define your default values using the pattern scholar.[key] || ''
const defaultValues = {
    guide: '',
    name: '',
    register_number: '',
    study_type: '',
    fellowship: '',
    registration_date: '',
    viva_voice_date: '',
    status: '',
    gender: '',
    category: '',
    pg_college: '',
    ug_college: '',
    university: '',
    research_title: '',
    working_at_ssn: '',
    pg_graduating_year: '',
    status_of_research: '',
    ug_graduating_year: ''
};

export default function ScholarEditForm({ scholar }) {
    const [saved, setSaved] = React.useState(true)

    const { state, open, close } = useToggleState()
    const { state: alertState, open: alertOpen, close: alertClose } = useToggleState()

    const form = useForm({
        resolver: zodResolver(scholarSchema),
        defaultValues: Object.fromEntries(Object.entries(defaultValues).map(([key, value]) => [key, scholar[key]])),
    })

    const allFormData = form.watch(); // Watching all data

    React.useEffect(() => {

        if (JSON.stringify(allFormData) === JSON.stringify(scholar)) {
            setSaved(false)
        } else {
            setSaved(true)
        }

    }, [allFormData]);


    const onSubmit = async (data) => {
        console.log(data)
    }

    return (
        <>

            <AlertDialog open={alertState}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                        <AlertDialogDescription>
                            You have unsaved changes. Are you sure you want to leave?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={alertClose}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                form.reset()
                                alertClose()
                                close()
                            }}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >

            <Dialog open={state} onOpenChange={(value) => {
                if (!value && saved) {
                    return alertOpen()
                }
                return value ?
                    open() : close()
            }}>
                <DialogTrigger asChild>
                    <Button variant="link" className="gap-2 w-full justify-between" onClick={open}>
                        Edit
                        <SquarePen className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl flex flex-col gap-8 p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <Form {...form}>

                        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">

                            <div className='flex flex-col sm:flex-row sm:gap-4 justify-between sm:items-center col-span-3 sticky top-0 bg-white px-6 py-5 border-b sm:rounded-t-lg'>

                                <h2 className="font-bold text-3xl">
                                    Edit Scholar Information
                                </h2>

                                {saved ?
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.1, ease: "easeInOut" }}
                                        className="flex items-center space-x-2 pr-5">
                                        <span className="font-medium text-xs">Changes Detected! </span>

                                        <Button type="button" size="sm" variant="outline" onClick={() => form.reset()}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" size="sm">
                                            Save
                                        </Button>

                                    </motion.div>
                                    : null}


                            </div>

                            <div className="overflow-y-auto h-[65vh] p-6">
                                <div className='grid grid-cols-2 gap-x-4 gap-y-2'>

                                    {/* <div className="relative p-2 bg-white rounded-xl shadow-md w-[250px] h-[250px]">
                                    <Image src={"https://avatars.githubusercontent.com/u/124599?v=4"} width={250} height={250} className="rounded-lg aspect-square" />

                                    <div className={buttonVariants({ variant: "outline", size: "icon", className: "absolute bottom-0 right-0 m-3" })}>
                                        <ImageUp className="w-4 h-4" />
                                    </div>
                                </div> */}

                                    <FormField
                                        control={form.control}
                                        name="register_number"
                                        render={({ field }) => (
                                            <ScholarDetail label={"Register Number"} field={{ ...field, disabled: true }} className={"fixed invisible"} />
                                        )}
                                    />
                                    <p className="mb-2 font-bold text-2xl col-span-2">About</p>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <ScholarDetail label={"Name"} field={field} />
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <ScholarDetail label={"Gender"} field={field} />
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <ScholarDetail label={"Category"} field={field} />
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="university"
                                        render={({ field }) => (
                                            <ScholarDetail label={"University"} field={field} />
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="study_type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Study Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-12">
                                                            <SelectValue placeholder="Select Study Type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="FT">Full-Time</SelectItem>
                                                        <SelectItem value="PT">Part-Time</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="fellowship"
                                        render={({ field }) => (
                                            <ScholarDetail label={"Fellowship"} field={field} />
                                        )}
                                    />
                                    <Separator className="col-span-2 mt-4" />
                                    <p className="my-2 font-bold text-2xl col-span-2">PhD Status</p>
                                </div>


                                <div className='grid grid-cols-2 gap-x-4 gap-y-2'>

                                    <FormField
                                        control={form.control}
                                        name="guide"
                                        render={({ field }) => (
                                            <ScholarDetail label={"Guide Name"} field={field} />
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>PhD Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-12">
                                                            <SelectValue placeholder="Select Status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Y">Completed</SelectItem>
                                                        <SelectItem value="N">Not Completed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="registration_date"
                                        render={({ field }) => (
                                            <ScholarDetail label={"Registration Date"} field={field} />
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="viva_voice_date"
                                        render={({ field }) => (
                                            <ScholarDetail label={"Viva Voice Date"} field={field} />
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="research_title"
                                        render={({ field }) => (
                                            <ScholarDetail label={"Research Title"} field={field} className="col-span-2" />
                                        )}
                                    />

                                </div>

                                <div className='grid grid-cols-2 gap-x-4 gap-y-2 pt-2'>
                                    {/* 
                                    <FormField
                                        control={form.control}
                                        name="study_type"
                                        render={({ field }) => (
                                            <ScholarDetail label={"Study Type"} field={field} />
                                        )}
                                    /> */}


                                    <Separator className="col-span-2 mt-4" />
                                    <p className="my-2 font-bold text-2xl col-span-2">Previous Academic Details</p>
                                    <FormField
                                        control={form.control}
                                        name="pg_college"
                                        render={({ field }) => (
                                            <ScholarDetail label={"PG College"} field={field} />
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pg_graduating_year"
                                        render={({ field }) => (
                                            <ScholarDetail label={"PG Graduating Year"} field={field} />
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="ug_graduating_year"
                                        render={({ field }) => (
                                            <ScholarDetail label={"UG Graduating Year"} field={field} />
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="ug_college"
                                        render={({ field }) => (
                                            <ScholarDetail label={"UG College"} field={field} />
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>

                </DialogContent>
            </Dialog>
        </>
    )
}
