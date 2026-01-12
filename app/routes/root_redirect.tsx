import { redirect } from "react-router";
import type { Route } from "./+types/root_redirect";

export function loader() {
    return redirect("/en");
}
