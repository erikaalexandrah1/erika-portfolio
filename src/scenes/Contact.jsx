import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";

import Navbar from "../components/Navbar";
import OrbitalArcs from "../components/OrbitalArcs";

import SoftBackground from "../components/ContactComponents/SoftBackground";
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
      {/* Capa 1: fondo suave estático */}
      <SoftBackground {...CONTACT_BG} />

      {/* Capa 2: Canvas con ruido animado (no bloquea inputs) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Canvas
          gl={{ alpha: true }}
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.08} />
          <pointLight position={[0, 0, 5]} intensity={1.2} color="#ff00ff" />
          <pointLight position={[-4, -2, -5]} intensity={1.0} color="#00ffff" />
          <OrbitalArcs />
        </Canvas>
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
