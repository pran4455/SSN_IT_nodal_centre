'use client'

import useToggleState from "@/hooks/useTogleState"
import clsx from "clsx"
import { useEffect } from "react"

import {
    Accordion,
    AccordionItem,
} from "@/components/ui/accordion"

import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"
import { SquarePen, X } from 'lucide-react';


const LabelInfo = ({
    label,
    currentInfo,
    isPending,
    isSuccess,
    isError,
    clearState,
    readOnly = false,
    errorMessage = "An error occurred, please try again",
    children,
}) => {

    const { state, close, toggle } = useToggleState()

    const handleToggle = () => {
        clearState()
        setTimeout(() => toggle(), 100)
    }

    useEffect(() => {
        if (isSuccess) {
            close()
        }
    }, [isSuccess, close])

    return (
        <div className="text-xs">
            <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 border rounded-md" style={{ backgroundColor: currentInfo?.color }} />
                    <div className="flex flex-col">
                        <span className="capitalize text-gray-700 font-bold">{label}</span>
                        {!currentInfo?.description &&
                            <span className="capitalize font-bold">
                                (Not Set)
                            </span>
                        }
                        <div className="flex items-center flex-1 basis-0 justify-start gap-x-4">
                            {typeof currentInfo?.description === "string" ? (
                                <span>{currentInfo.description}</span>
                            ) : (
                                currentInfo.description
                            )}
                        </div>
                    </div>
                </div>

                {!readOnly &&
                    <div>
                        <Button
                            variant="outline"
                            size="icon"
                            className={state && "bg-zinc-100"}
                            onClick={handleToggle}
                            type={state ? "reset" : "button"}
                        >
                            {state ? <X className="w-4 h-4" /> : <SquarePen className="w-4 h-4" />}
                        </Button>
                    </div>
                }
            </div>

            {/* Success state */}
            <Accordion>
                <AccordionItem
                    className={clsx(
                        "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
                        {
                            "max-h-[1000px] opacity-100": isSuccess,
                            "max-h-0 opacity-0": !isSuccess,
                        }
                    )}
                >
                    <Badge className="p-2 my-4 rounded-md bg-green-200 text-green-800/90" variant="outline">
                        <span>Label updated succesfully</span>
                    </Badge>
                </AccordionItem>
            </Accordion>

            {/* Error state  */}
            <Accordion>
                <AccordionItem
                    className={clsx(
                        "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
                        {
                            "max-h-[1000px] opacity-100": isError,
                            "max-h-0 opacity-0": !isError,
                        }
                    )}
                >
                    <Badge className="p-2 my-4" color="red">
                        <span>{errorMessage}</span>
                    </Badge>
                </AccordionItem>
            </Accordion>

            <Accordion>
                <AccordionItem
                    className={clsx(
                        "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
                        {
                            "max-h-[1000px] opacity-100 z-10 overflow-visible": state,
                            "max-h-0 opacity-0": !state,
                        }
                    )}
                >
                    <div className="flex flex-col gap-y-2 py-4">
                        <div>{children}</div>
                        <div className="flex items-center justify-end mt-2">
                            <Button
                                disabled={isPending}
                                className="w-full sm:max-w-[140px]"
                                size="sm"
                                type="submit"
                            >
                                Save changes
                            </Button>
                        </div>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default LabelInfo