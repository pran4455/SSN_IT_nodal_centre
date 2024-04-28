'use client'
import React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"

import { Button } from "./ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { filterSchema } from "@/validations/filter"

import { useMutation } from '@tanstack/react-query'
import { API } from "@/config/others"
import { toast } from "sonner"

import useToggleState from "@/hooks/useTogleState"
import { AxiosError } from "axios"


export default function SaveFilter({ filter, labels, savedFilter }) {
    const { state, open, close } = useToggleState()

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            name: '',
            label: '',
        }
    });

    React.useEffect(() => {
        if (savedFilter) {
            form.reset({
                name: savedFilter?.name,
                label: String(savedFilter?.label),
            })
        }
    }, [savedFilter, form.reset])

    const _filter = React.useMemo(() => {
        const mergedFilter = Object.keys(filter).reduce((acc, key) => {
            if (key === 'from') {
                acc[key] = format(filter[key], "dd-MM-yyyy");
            } else if (key === 'to') {
                const today = new Date();
                const to = new Date(filter[key]);
                if (to.toDateString() !== today.toDateString()) {
                    acc[key] = format(filter[key], "dd-MM-yyyy");
                }
            } else {
                acc[key] = filter[key];
            }
            return acc;
        }, {});

        return mergedFilter;
    }, [filter]);

    const { mutate: createFilter, isError, isSuccess, isPending, } = useMutation({
        mutationFn: async (data) => {

            savedFilter ? await API.patch(`/filter/${savedFilter.id}`, data) : await API.post('/filter/new', data)
        },
        onSuccess: () => {
            console.log('success')
            savedFilter ? toast.success('Updated Successfully') : toast.success('Saved New Filter Successfully')
            close()
            router.refresh()
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                console.log(error.response)
                toast.error(error.response?.data.message || error.message)
            }
        },
    })

    const onSubmit = async (data) => {
        createFilter({ ...data, filter: _filter })

    }

    const onOpenChange = (value) => {

        if (value) {
            open()
        } else {
            close()
            form.reset()
        }
    }

    return (
        <Dialog open={state} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button size="sm">
                    {savedFilter ? 'Update Filter' : 'Save Filter'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <DialogHeader>
                            <DialogTitle>Save As Filter</DialogTitle>
                            <DialogDescription>
                                Create new filter for easy access here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex gap-4 justify-between">


                            <div className="w-full">
                                <div className="font-semibold mb-1">Attributes</div>
                                <div className="bg-secondary/70 p-2  rounded-md text-xs font-mono">
                                    {Object.keys(_filter).map((id, index) =>
                                        <div key={index} className="flex gap-2">
                                            {id}:
                                            <span>
                                                {_filter[id]}
                                            </span>
                                        </div>)}

                                </div>
                            </div>
                        </div>

                        <DialogFooter className="flex items-center">
                            <div className="flex gap-2 items-center w-full">

                                <FormField
                                    control={form.control}
                                    name="label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="bg-white text-xs w-[135px]">
                                                    <SelectValue placeholder="Select Label" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {labels.map((label, index) =>
                                                        <SelectItem key={index} value={String(label.id)}>
                                                            <div className="flex gap-2 items-center">
                                                                <div style={{ backgroundColor: label.color }} className="w-2 h-2 rounded-full" />
                                                                <span>
                                                                    {label.name}
                                                                </span>
                                                            </div>

                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Enter Filter name" type="text"{...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                            </div>

                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog >

    )
}
