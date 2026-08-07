import { redirect } from "next/navigation";

// TODO: replace with the real Screen 1 landing ("Drop your photo. Become
// part of HH Goa." + Start button) per the User Flow section of the
// architecture doc. For now this routes straight to the upload form.
export default function Home() {
  redirect("/upload");
}
