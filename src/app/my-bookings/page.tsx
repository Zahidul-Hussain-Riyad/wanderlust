import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBookingsPage = async() => {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user
    const res = await fetch(`http://localhost:8000/my-bookings/${user?.email}`)
    const bookings: IBooking[] = await res.json();
    console.log(bookings);

    return (
        <div>
            My bookings
        </div>
    );
};

export default MyBookingsPage;