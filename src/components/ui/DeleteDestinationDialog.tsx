import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@base-ui/react";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

const DeleteDestinationDialog = ({id}) => {

    const handleDeleteDestination = async () => {

        const res = fetch(`http://localhost:8000/destination/${id}`, {
            method: "DELETE",
        })
        const data = await res.json();

        redirect('/destination');

    };

    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button
              className="bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
              render={<Link href="/destinations" />}
            >
              Delete
            </Button>}>
                Show Dialog
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteDestination}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDestinationDialog;