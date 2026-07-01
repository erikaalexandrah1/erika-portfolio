import React, { useState, lazy, Suspense } from "react";

import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import useDeferredMount from "../hooks/useDeferredMount";

import SoftBackground from "../components/ContactComponents/SoftBackground";
const ContactCanvas = lazy(() => import("../components/ContactComponents/ContactCanvas"));
import SectionShell from "../components/ContactComponents/SectionShell";

import ContactHero from "../components/ContactComponents/ContactHero";
import DirectCard from "../components/ContactComponents/DirectCard";
import ContactForm from "../components/ContactComponents/ContactForm";

import { CONTACT_BG, CONTACT_EMAIL, CONTACT_SOCIALS } from "../data/contactInformation";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "General",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const show3D = useDeferredMount();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    const subject = encodeURIComponent(`Contact: ${form.topic} — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\nSubject: ${form.subject}\n\n${form.message}`
    );
    const href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus("sent");
      window.location.href = href;
      setTimeout(() => setStatus("idle"), 2000);
    }, 500);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 1500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1500);
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <Seo
        title="Contact"
        description="Get in touch about classes, collaborations, or ideas. Short and clear works best — I read everything."
        path="/contact"
      />
      {/* Capa 1: fondo suave estático */}
      <SoftBackground {...CONTACT_BG} />

      {/* Capa 2: Canvas 3D diferido (no bloquea inputs ni la carga inicial) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {show3D && (
          <Suspense fallback={null}>
            <ContactCanvas />
          </Suspense>
        )}
      </div>

      {/* Contenido */}
      <Navbar />

      <main className="pointer-events-auto relative z-10">
        <ContactHero />

        <SectionShell className="pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <DirectCard
                email={CONTACT_EMAIL}
                onCopy={copyEmail}
                socials={CONTACT_SOCIALS}
              />
            </div>
            <div className="lg:col-span-2">
              <ContactForm
                form={form}
                setForm={setForm}
                status={status}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </SectionShell>

        <div className="h-8" />
      </main>
    </div>
  );
}
