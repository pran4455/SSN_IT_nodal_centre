'use client'

import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import React, { useEffect } from "react"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { labelSchema } from "@/validations/label"
import { useMutation } from '@tanstack/react-query'
import { supabase } from "@/lib/client"

import LabelInfo from "./LabelInfo"

export default function LabelForm({ label }) {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(labelSchema),
        defaultValues: {
            name: '',
            color: '',
            description: '',
        }
    });

    useEffect(() => {
        form.reset({
            name: label?.name,
            color: label?.color || "#0D4BA0",
            description: label?.description,
        })
    }, [label, form.reset])


    const { mutate: updateLabel, isError, isSuccess, isPending, reset } = useMutation({
        mutationFn: async (data) => {
            
            const { error } = await supabase
                .from('labels')
                .update(data)
                .eq('id', label?.id)

            if (error) {
                console.log(error)
                throw error
            }

        },
        onSuccess: () => {
            console.log('success')
            router.refresh()
        },
        onError: (error) => {
            console.error(error)
        },
    })

    const onSubmit = async (data) => {
        updateLabel(data)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full overflow-visible"
            >
                <LabelInfo
                    label={label.name}
                    currentInfo={label}
                    isPending={isPending}
                    isSuccess={isSuccess}
                    isError={isError}
                    clearState={reset}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Label name" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="p-0 w-8 h-8 rounded-full overflow-hidden border">
                                            <Input type="color" className="p-0 w-24 h-24 m-[-55%]" {...field}/>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Label Description" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </LabelInfo>

            </form>
        </Form>
    )
}
