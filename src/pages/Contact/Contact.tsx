import React, { useState } from "react";
import { Page } from "../../types";
import { PageHero } from "../../components/ui/PageHero";
import { Button } from "../../components/ui/Button";

interface ContactProps {
  type: "project" | "general";
  onNavigate: (p: Page) => void;
}

export function ContactPage({ type, onNavigate }: ContactProps) {
  const isProject = type === "project";
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: isProject ? "" : form.message,
          enquiryType: isProject ? "project" : "general",
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unable to send your request.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send your request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white text-[#1A1A1A]">
      <PageHero
        label={`CONTACT / ${isProject ? "START A PROJECT" : "GENERAL ENQUIRY"}`}
        title={isProject ? "START YOUR PROJECT" : "GET IN TOUCH"}
        subtitle={
          isProject
            ? "Submit your architectural brief or procurement plans. Our executive estimating team reviews all tender submissions within one business day."
            : "Direct access to our Melbourne headquarters for corporate partnerships, trade panel registration, and media enquiries."
        }
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&h=700&fit=crop&auto=format"
      />

      {/* View Switcher */}
      <div className="sticky top-20 z-30 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#E5E5E5]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex gap-4">
          <button
            onClick={() => onNavigate("contact-project")}
            className={`py-4 px-6 text-xs tracking-[0.14em] font-semibold uppercase transition-colors border-b-2 cursor-pointer ${
              isProject
                ? "border-[#D4913A] text-[#D4913A] bg-white"
                : "border-transparent text-[#737373] hover:text-[#111111]"
            }`}
          >
            START A PROJECT (TENDER BRIEF)
          </button>
          <a
            href="https://wa.me/9172680913"
            target="_blank"
            rel="noreferrer"
            className="py-4 px-6 text-xs tracking-[0.14em] font-semibold uppercase transition-colors border-b-2 border-transparent text-[#737373] hover:text-[#111111] cursor-pointer"
          >
            CONTACT ON WHATSAPP
          </a>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8">
              {submitted ? (
                <div className="p-12 bg-[#FBFBFA] border border-[#D4913A] text-center animate-in fade-in zoom-in-95 duration-500 rounded-xs shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-[#FFF9F2] border-2 border-[#D4913A] flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-[#D4913A]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] uppercase mb-3">
                    BRIEF TRANSMITTED SUCCESSFULLY
                  </h3>
                  <p className="text-sm text-[#525252] max-w-md mx-auto mb-8 leading-relaxed font-normal">
                    Thank you, {form.name || "Client"}. Your project submission has been routed directly to Managing Director James Reeves and our head of pre-construction estimating. We will review and provide an initial response within one business day.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    SUBMIT ANOTHER TRANSMISSION
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#FBFBFA] border border-[#E5E5E5] p-8 sm:p-10 shadow-xs space-y-6 rounded-xs"
                >
                  <div className="pb-4 border-b border-[#E5E5E5]">
                    <span className="text-xs font-semibold tracking-[0.16em] text-[#D4913A] uppercase block mb-1">
                      {isProject ? "NEW PROJECT SPECIFICATION" : "DIRECT CORRESPONDENCE"}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111111] uppercase">
                      {isProject ? "TELL US ABOUT YOUR BUILD" : "HOW CAN WE ASSIST YOU?"}
                    </h3>
                  </div>

                  {/* Personal & Corporate Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.12em] text-[#D4913A] uppercase mb-2">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Marcus Vance"
                        className="w-full px-4 py-3 bg-white border border-[#D4D4D4] focus:border-[#D4913A] text-sm text-[#111111] focus:outline-none transition-colors placeholder-[#A3A3A3] font-normal rounded-xs shadow-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.12em] text-[#D4913A] uppercase mb-2">
                        CORPORATE EMAIL *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="e.g. m.vance@company.com.au"
                        className="w-full px-4 py-3 bg-white border border-[#D4D4D4] focus:border-[#D4913A] text-sm text-[#111111] focus:outline-none transition-colors placeholder-[#A3A3A3] font-normal rounded-xs shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.12em] text-[#D4913A] uppercase mb-2">
                        MOBILE NUMBER *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required={isProject}
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="e.g. +61 400 000 000"
                        className="w-full px-4 py-3 bg-white border border-[#D4D4D4] focus:border-[#D4913A] text-sm text-[#111111] focus:outline-none transition-colors placeholder-[#A3A3A3] font-normal rounded-xs shadow-xs"
                      />
                    </div>
                  </div>

                  {!isProject && <div>
                    <label className="block text-xs font-semibold tracking-[0.12em] text-[#D4913A] uppercase mb-2">
                      MESSAGE / ENQUIRY *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How may we direct your enquiry?"
                      className="w-full px-4 py-3 bg-white border border-[#D4D4D4] focus:border-[#D4913A] text-sm text-[#111111] focus:outline-none transition-colors placeholder-[#A3A3A3] resize-none font-normal rounded-xs shadow-xs"
                    />
                  </div>}

                  <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                    <span className="text-[11px] text-[#B42318] font-medium">
                      {submitError || "* PROTECTED UNDER MUTUAL NDA PROTOCOL"}
                    </span>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={submitting}
                    >
                      {submitting ? "TRANSMITTING..." : isProject ? "SUBMIT BRIEF →" : "SEND ENQUIRY →"}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Coordinates */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#FBFBFA] border border-[#E5E5E5] p-8 shadow-xs space-y-6 rounded-xs">
                <h3 className="text-sm font-bold tracking-[0.16em] text-[#111111] uppercase pb-4 border-b border-[#E5E5E5]">
                  DIRECT HEADQUARTERS
                </h3>

                <div>
                  <span className="text-[10px] tracking-[0.14em] text-[#D4913A] uppercase font-semibold block mb-1">
                    MELBOURNE CBD OFFICE
                  </span>
                  <p className="text-sm text-[#111111] leading-relaxed font-normal">
                    Level 12, 200 Queen Street<br />
                    Melbourne VIC 3000, Australia
                  </p>
                </div>

                <div>
                  <span className="text-[10px] tracking-[0.14em] text-[#D4913A] uppercase font-semibold block mb-1">
                    DIRECT TELEPHONE
                  </span>
                  <a
                    href="tel:+61390001234"
                    className="text-sm text-[#111111] hover:text-[#D4913A] transition-colors font-medium"
                  >
                    +61 3 9000 1234
                  </a>
                </div>

                <div>
                  <span className="text-[10px] tracking-[0.14em] text-[#D4913A] uppercase font-semibold block mb-1">
                    EMAIL DISPATCH
                  </span>
                  <a
                    href="mailto:enquiries@buildcore.com.au"
                    className="text-sm text-[#D4913A] hover:underline font-medium"
                  >
                    enquiries@buildcore.com.au
                  </a>
                </div>

                <div>
                  <span className="text-[10px] tracking-[0.14em] text-[#D4913A] uppercase font-semibold block mb-1">
                    OPERATING HOURS
                  </span>
                  <p className="text-xs text-[#525252] font-normal">
                    Monday – Friday: 07:00 – 18:00 AEST<br />
                    Emergency site superintendent on call 24/7
                  </p>
                </div>
              </div>

              {/* Response SLA Guarantee */}
              <div className="p-6 bg-[#FBFBFA] border border-[#E5E5E5] rounded-xs shadow-xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D4913A] uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4913A]" />
                  <span>ONE BUSINESS DAY SLA</span>
                </div>
                <p className="text-xs text-[#525252] leading-relaxed font-normal">
                  Every submission is reviewed by a founding director or senior project manager. You will receive an engineering response, not an automated support ticket.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
