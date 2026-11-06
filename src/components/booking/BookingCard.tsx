"use client"
import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { Input } from '@base-ui/react';

const perks = [
    "Free cancellation up to 7 days",
    "Travel insurance included",
    "24/7 customer support",
];

function formatDepartureDate(value: string): string {
    const [year, month, day] = value.split("-");
    if (!year || !month || !day) return value;
    return `${month}/${day}/${year}`;
}

const BookingCard = ({ destination }: { destination: IDestination }) => {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    console.log(destination);

    const handleBooking = async (e) => {
        e.preventDefault();
        const departureDate = e.target.departureData.value;
        console.log(departureDate);
        const data = {
            username: user?.name,
            email: user?.image,
            image: user?.email,
            ...destination,
            departureDate: departureDate,
            bookingDate: new Date()
        }

        const res = await fetch('http://localhost:8000/booking', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:  JSON.stringify(data)
        })

        const bookingRes = await res.json()
        console.log(bookingRes);
    }

    return (
        <aside className="self-start border border-neutral-100 p-6 shadow-sm">
            <p className="text-xs text-neutral-500">Starting from</p>
            <p className="mt-1 font-serif text-4xl font-light text-cyan-700">
                ${Number.parseInt(destination.price, 10)}
            </p>
            <p className="mt-1 text-xs text-neutral-500">per person</p>

            <form onSubmit={handleBooking}>
                <Input
                    type='date'
                    name='departureDate'
                    aria-label='Departure date'
                    defaultValue={destination.departureDate}
                    className="mt-4"
                />
                <Button
                    type="submit"
                    className="mt-4 flex w-full items-center justify-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600"
                >
                    Book Now
                    <ArrowRight className="size-4" />
                </Button>
            </form>

            {/* <div className="mt-6 bg-[#f5f7f8] px-3.5 py-2.5 text-sm text-neutral-700">
              {destination.departureDate
                ? formatDepartureDate(destination.departureDate)
                : "No departure date"}
            </div> */}

            <ul className="mt-6 space-y-2.5">
                {perks.map((perk) => (
                    <li
                        key={perk}
                        className="flex items-center gap-2 text-xs text-neutral-600"
                    >
                        <Check className="size-3.5 shrink-0 text-green-600" />
                        {perk}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default BookingCard;