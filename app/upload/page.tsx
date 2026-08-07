"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Stage } from "@/components/Stage/Stage";
import { BackgroundDecor } from "@/components/BackgroundDecor/BackgroundDecor";
import { BrandHeader } from "@/components/BrandHeader/BrandHeader";
import { PhotoUploader } from "@/components/PhotoUploader/PhotoUploader";
import { FormField } from "@/components/Inputs/FormField";
import { CtaButton } from "@/components/Inputs/CtaButton";
import { SelectField } from "@/components/Inputs/SelectField";
import { BuilderFields, BUILDER_FIELDS_KEY, BUILDER_PHOTO_KEY } from "@/types/builder";

export default function UploadPage() {
  const router = useRouter();
  const photoFileRef = useRef<File | null>(null);
  const [photoError, setPhotoError] = useState(false);

  function handlePhotoSelected(file: File) {
    photoFileRef.current = file;
    setPhotoError(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!photoFileRef.current) {
      setPhotoError(true);
      return;
    }
    const formData = new FormData(e.currentTarget);
    const fields: BuilderFields = {
      name: String(formData.get("name") ?? ""),
      stack: String(formData.get("stack") ?? ""),
      instagram: String(formData.get("instagram") ?? ""),
      mission: String(formData.get("mission") ?? ""),
      superpower: String(formData.get("superpower") ?? ""),
      mode: String(formData.get("mode") ?? ""),
    };

    sessionStorage.setItem(BUILDER_FIELDS_KEY, JSON.stringify(fields));

    const photoFile = photoFileRef.current;
    if (photoFile) {
      const dataUrl = await fileToDataUrl(photoFile);
      sessionStorage.setItem(BUILDER_PHOTO_KEY, dataUrl);
    }

    router.push("/result");
  }

  return (
    <Stage ariaLabel="Hacker House Goa 2026 builder card generator">
      <BackgroundDecor />
      <BrandHeader />
      <PhotoUploader onPhotoSelected={handlePhotoSelected} showError={photoError} />

      <form onSubmit={handleSubmit}>
        <FormField fieldKey="name" label="How should we call you" id="field-name" name="name" type="text" required />
        <FormField fieldKey="stack" label="Current Stack" id="field-stack" name="stack" type="text" required />
        <FormField fieldKey="instagram" label="Instagram" id="field-instagram" name="instagram" type="text" />
        <FormField fieldKey="mission" label="Current Mission" id="field-mission" name="mission" type="text" placeholder="eg. maxxing github: mining crypto"/>
        <SelectField
          fieldKey="superpower"
          label="Superpower"
          id="field-superpower"
          name="superpower"
          options={[
            { value: "⚡ Ships Fast", label: "⚡ Ships Fast" },
            { value: "🧠 Solves Hard Problems", label: "🧠 Solves Hard Problems" },
            { value: "🤖 Automates Everything", label: "🤖 Automates Everything" },
            { value: "🎨 Crafts Beautiful UX", label: "🎨 Crafts Beautiful UX" },
            { value: "🛰 Thinks Big", label: "🛰 Thinks Big" },
            { value: "🔍 Breaks Down Complexity", label: "🔍 Breaks Down Complexity" },
            { value: "🔥 Turns Ideas into Products", label: "🔥 Turns Ideas into Products" },
            { value: "🛠 Builds Anything", label: "🛠 Builds Anything" },
            { value: "🌱 Learns Ridiculously Fast", label: "🌱 Learns Ridiculously Fast" },
            { value: "🤝 Brings People Together", label: "🤝 Brings People Together" },
          ]}
        />
        <SelectField
          fieldKey="mode"
          label="Builder Type"
          id="field-mode"
          name="mode"
          options={[
            { value: "💻 Full-Stack Builder", label: "💻 Full-Stack Builder" },
            { value: "🤖 AI Engineer", label: "🤖 AI Engineer" },
            { value: "🚀 Founder", label: "🚀 Founder" },
            { value: "🎨 Product Designer", label: "🎨 Product Designer" },
            { value: "⚙️ Robotics Builder", label: "⚙️ Robotics Builder" },
            { value: "📱 Mobile Builder", label: "📱 Mobile Builder" },
            { value: "🌐 Web Builder", label: "🌐 Web Builder" },
            { value: "🔬 Researcher", label: "🔬 Researcher" },
            { value: "☁️ Systems Builder", label: "☁️ Systems Builder" },
            { value: "🎓 Student Builder", label: "🎓 Student Builder" },
          ]}
        />

        <CtaButton type="submit" label="enter the realm.." labelLeft={315} />
      </form>
    </Stage>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
