import { Slot } from "expo-router";
import { BackendProvider } from "./contexts/BackendContext";

export default function Layout() {
    return (
        <BackendProvider>
            <Slot />
        </BackendProvider>
    )
}