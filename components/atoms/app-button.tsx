import { Button } from "../ui/button";

export function AppButton({...props}: React.ComponentProps<typeof Button>) {
    return (
        <Button
        {...props}
        >
        {props.children}
        </Button>
    );
}