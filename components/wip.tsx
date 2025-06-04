"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export default function Wip() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center px-4 -mt-10">
            <div
                className={`max-w-2xl mx-auto text-center transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
            >
                <h1 className="text-3xl md:text-5xl font-light mb-6 tracking-tight">
                    We are working on <span className="font-medium">something incredible</span>
                </h1>

                <div className="w-16 h-[1px] bg-gray-300 mx-auto my-8"></div>

                <p className="text-muted-foreground mb-10 text-lg">
                    Our team is putting the finishing touches on our new project. We'll be launching soon.
                </p>

                <div className="inline-block">
                    <Button>
                        Get notified
                    </Button>
                </div>
            </div>
        </div>
    )
}
