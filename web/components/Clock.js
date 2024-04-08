'use client'
import { useState, useEffect } from 'react';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, []);

    useEffect(() => {
        if (isClient) {
            // Update the current time every second
            const intervalId = setInterval(() => {
                setCurrentTime(new Date());
            }, 1000);

            // Cleanup the interval to avoid memory leaks
            return () => clearInterval(intervalId);
        }
    }, [isClient]);

    // Format the time to HH:mm:ss
    const formattedTime = currentTime.toLocaleTimeString('en-US');

    return (
        <>
            {isClient ? formattedTime : "00:00:00 AM"}
        </>
    );
};

export default Clock;