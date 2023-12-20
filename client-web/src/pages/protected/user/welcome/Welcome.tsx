import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UserShelterList } from "./components/UserShelterList";
import CreateShelter from "@/components/createShelter/CreateShelter";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/api/features/auth/authSlice";

export const Welcome = () => {
    const user = useSelector(selectCurrentUser);
    return (
        <div className="space-y-6 p-10 pb-16">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">{`Welcome ${user.firstName}!`}</h2>
                <p className="text-muted-foreground">
                    Explore your shelters effortlessly with our intuitive list view. Manage tasks and stay informed, all
                    in one place, simplifying your shelter-related responsibilities.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Dialog>
                    <Button asChild>
                        <DialogTrigger>Create new Shelter MS</DialogTrigger>
                    </Button>
                    <CreateShelter />
                </Dialog>
            </div>
            <UserShelterList />
        </div>
    );
};
