"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle,
  Phone,
  Mail,
  Bell,
  BookOpenCheck,
  School,
  FileCheck,
} from "lucide-react";
import { getAdmissionSessionLabel } from "@/lib/admission-session";

const getAnnouncements = (admissionSessionLabel: string) => [
  {
    icon: Bell,
    title: `Admissions Open ${admissionSessionLabel}`,
    desc: "Applications are now open for Nursery to 8th Std. Limited seats available. Apply early!",
    highlight: true,
  },
  {
    icon: BookOpenCheck,
    title: "Admission Guidance",
    desc: "Our admission team helps parents with application process, documents, and eligibility details on all working days.",
    highlight: false,
  },
  {
    icon: School,
    title: "Open for All Day",
    desc: "The school welcomes parents and students who wish to visit the school. Parents can also meet the Director Academics, Principal, and teachers on any working day.",
    highlight: false,
  },
  {
    icon: FileCheck,
    title: "Transfer Certificate Admissions",
    desc: "Admissions through transfer certificate are considered by the school based on eligibility and seat availability.",
    highlight: false,
  },
];

const standards = [
  "Nursery",
  "Jr. KG",
  "Sr. KG",
  "1st Std",
  "2nd Std",
  "3rd Std",
  "4th Std",
  "5th Std",
  "6th Std",
  "7th Std",
  "8th Std",
];

type FormState = {
  studentName: string;
  parentName: string;
  contact: string;
  email: string;
  applyingForStd: string;
  currentStd: string;
  currentSchool: string;
  message: string;
  website: string;
};

export default function AdmissionSection() {
  const admissionSessionLabel = getAdmissionSessionLabel();
  const announcements = getAnnouncements(admissionSessionLabel);

  const [form, setForm] = useState<FormState>({
    studentName: "",
    parentName: "",
    contact: "",
    email: "",
    applyingForStd: "",
    currentStd: "",
    currentSchool: "",
    message: "",
    website: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!form.studentName.trim())
      newErrors.studentName = "Student name is required";
    if (!form.parentName.trim())
      newErrors.parentName = "Parent name is required";
    if (!/^\d{10}$/.test(form.contact))
      newErrors.contact = "Enter a valid 10-digit phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (!form.applyingForStd)
      newErrors.applyingForStd = "Please select a standard";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/admission-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setSubmitError(
          data?.error || "Failed to submit inquiry. Please try again.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white text-[oklch(0.20_0.02_30)] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[oklch(0.36_0.13_25)] transition-shadow ${
      errors[field] ? "border-red-400" : "border-[oklch(0.88_0.03_70)]"
    }`;

  return (
    <section
      id="admission"
      className="py-20 lg:py-28 bg-[oklch(0.36_0.13_25)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-[oklch(0.76_0.13_80)]/30 text-[oklch(0.76_0.13_80)] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Admissions {admissionSessionLabel}
          </span>
          <h2 className="font-serif font-black text-white text-3xl lg:text-4xl xl:text-5xl text-balance mb-4">
            Begin Your Child&apos;s Journey With Us
          </h2>
          <p className="max-w-2xl mx-auto text-white/80 text-base lg:text-lg leading-relaxed text-pretty">
            Fill out the inquiry form below and our admissions team will reach
            out soon to guide you through the next steps.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl shadow-[oklch(0.20_0.02_30)]/20 p-8 lg:p-10">
            {submitted ? (
              <div className="text-center py-16 flex flex-col items-center gap-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-2xl">
                  Inquiry Received!
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  Thank you for your interest in Devarshi Vidhyalaya. Our
                  admissions team will contact you soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSubmitError(null);
                    setForm({
                      studentName: "",
                      parentName: "",
                      contact: "",
                      email: "",
                      applyingForStd: "",
                      currentStd: "",
                      currentSchool: "",
                      message: "",
                      website: "",
                    });
                  }}
                  className="mt-4 px-6 py-2.5 border-2 border-[oklch(0.36_0.13_25)] text-[oklch(0.36_0.13_25)] font-semibold rounded-full hover:bg-[oklch(0.36_0.13_25)] hover:text-white transition-colors text-sm"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Admission Inquiry Form"
              >
                <h3 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-xl mb-6">
                  Admission Inquiry Form
                </h3>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Student Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="studentName"
                      className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                    >
                      Student&apos;s Full Name{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="studentName"
                      name="studentName"
                      type="text"
                      placeholder="e.g. Riya Sharma"
                      value={form.studentName}
                      onChange={handleChange}
                      className={inputClass("studentName")}
                      aria-describedby={
                        errors.studentName ? "studentName-error" : undefined
                      }
                      aria-invalid={!!errors.studentName}
                    />
                    {errors.studentName && (
                      <p
                        id="studentName-error"
                        className="text-red-500 text-xs"
                        role="alert"
                      >
                        {errors.studentName}
                      </p>
                    )}
                  </div>

                  {/* Parent Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="parentName"
                      className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                    >
                      Parent / Guardian Name{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="parentName"
                      name="parentName"
                      type="text"
                      placeholder="e.g. Mr. Anil Sharma"
                      value={form.parentName}
                      onChange={handleChange}
                      className={inputClass("parentName")}
                      aria-describedby={
                        errors.parentName ? "parentName-error" : undefined
                      }
                      aria-invalid={!!errors.parentName}
                    />
                    {errors.parentName && (
                      <p
                        id="parentName-error"
                        className="text-red-500 text-xs"
                        role="alert"
                      >
                        {errors.parentName}
                      </p>
                    )}
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact"
                      className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                    >
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={form.contact}
                      onChange={handleChange}
                      className={inputClass("contact")}
                      maxLength={10}
                      aria-describedby={
                        errors.contact ? "contact-error" : undefined
                      }
                      aria-invalid={!!errors.contact}
                    />
                    {errors.contact && (
                      <p
                        id="contact-error"
                        className="text-red-500 text-xs"
                        role="alert"
                      >
                        {errors.contact}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="parent@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass("email")}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="text-red-500 text-xs"
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Applying Std */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label
                      htmlFor="applyingForStd"
                      className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                    >
                      Std Applying For <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="applyingForStd"
                      name="applyingForStd"
                      value={form.applyingForStd}
                      onChange={handleChange}
                      className={inputClass("applyingForStd")}
                      aria-describedby={
                        errors.applyingForStd
                          ? "applyingForStd-error"
                          : undefined
                      }
                      aria-invalid={!!errors.applyingForStd}
                    >
                      <option value="">Select Std</option>
                      {standards.map((std) => (
                        <option key={std} value={std}>
                          {std}
                        </option>
                      ))}
                    </select>
                    {errors.applyingForStd && (
                      <p
                        id="applyingForStd-error"
                        className="text-red-500 text-xs"
                        role="alert"
                      >
                        {errors.applyingForStd}
                      </p>
                    )}
                  </div>

                  {/* Current Std */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="currentStd"
                      className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                    >
                      Current Std
                    </label>
                    <select
                      id="currentStd"
                      name="currentStd"
                      value={form.currentStd}
                      onChange={handleChange}
                      className={inputClass("currentStd")}
                    >
                      <option value="">Select Current Std</option>
                      {standards.map((std) => (
                        <option key={`current-${std}`} value={std}>
                          {std}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Current School */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="currentSchool"
                      className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                    >
                      Current School
                    </label>
                    <input
                      id="currentSchool"
                      name="currentSchool"
                      type="text"
                      placeholder="e.g. ABC Public School"
                      value={form.currentSchool}
                      onChange={handleChange}
                      className={inputClass("currentSchool")}
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                    >
                      Additional Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Any specific queries or requirements..."
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass("message")} resize-none`}
                    />
                  </div>
                </div>

                {submitError && (
                  <p
                    className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
                    role="alert"
                  >
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[oklch(0.36_0.13_25)] hover:bg-[oklch(0.26_0.11_25)] disabled:opacity-60 text-white font-bold rounded-full transition-colors text-sm shadow-lg"
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Announcements */}
          <aside
            className="lg:col-span-2 space-y-4"
            aria-label="Admission announcements"
          >
            <h3 className="font-serif font-bold text-white text-xl mb-2">
              Announcements
            </h3>
            {announcements.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`rounded-2xl p-5 ${
                    item.highlight
                      ? "bg-[oklch(0.76_0.13_80)] text-[oklch(0.20_0.02_30)]"
                      : "bg-white/10 backdrop-blur-sm text-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
                        item.highlight
                          ? "bg-[oklch(0.20_0.02_30)]/10"
                          : "bg-white/20"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${item.highlight ? "text-[oklch(0.20_0.02_30)]" : "text-white"}`}
                      />
                    </div>
                    <div>
                      <h4
                        className={`font-serif font-bold text-sm mb-1 ${
                          item.highlight
                            ? "text-[oklch(0.20_0.02_30)]"
                            : "text-white"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`text-xs leading-relaxed ${
                          item.highlight
                            ? "text-[oklch(0.20_0.02_30)]/80"
                            : "text-white/80"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Contact info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mt-2">
              <p className="text-white font-semibold text-sm mb-3">
                Direct Admissions Contact
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:+917574906163"
                  className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  +91 75749 06163
                </a>
                <a
                  href="mailto:devarshividhyalaya@gmail.com"
                  className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors break-all"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  devarshividhyalaya@gmail.com
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
