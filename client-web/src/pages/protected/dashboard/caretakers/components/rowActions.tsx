import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useMatch } from "react-router-dom";
import { Caretaker } from "./caretakerSchema";
import { EditCarekater } from "./editCaretaker/EditCarekater";
import { useRemoveCaretakerByUuidMutation } from "@/app/api/features/caretaker/caretakerApiSlice";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
    const { toast } = useToast();
    const caretaker = row.original as Caretaker;
    const match = useMatch("/dashboard/:shelterUuid/:lastPart");
    const shelterUuid = match?.params.shelterUuid || "";
    const [removeCaretakerByUuid] = useRemoveCaretakerByUuidMutation();

    const onSubmit = async () => {
        try {
            await removeCaretakerByUuid({ caretakerUuid: caretaker.uuid, shelterUuid }).unwrap();
            toast({
                variant: "success",
                title: "You have successfully removed caretaker",
                description: "Caretaker is no longer in your shelter system.",
            });
        } catch (err: unknown) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong!",
                description: "Try again later or refresh this page",
            });
        }
    };

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                        <DotsHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(caretaker.email)}>
                        Copy Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <DialogTrigger>Edit</DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onSubmit}>
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-md">
                <EditCarekater caretaker={caretaker as Caretaker} />
            </DialogContent>
        </Dialog>
    );
}
