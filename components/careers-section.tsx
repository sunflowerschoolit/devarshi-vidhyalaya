"use client";

import { useState } from "react";
import { CheckCircle, Link, Send } from "lucide-react";
import { TrendingUp, ArrowRight, Users, Heart } from "lucide-react";

type CareerFormState = {
  fullName: string;
  qualification: string;
  experienceYears: string;
  phone: string;
  email: string;
  address: string;
  message: string;
  website: string;
};

export default function CareersSection() {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<CareerFormState>({
    fullName: "",
    qualification: "",
    experienceYears: "",
    phone: "",
    email: "",
    address: "",
    message: "",
    website: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<CareerFormState>>({});

  const validate = () => {
    const nextErrors: Partial<CareerFormState> = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required";
    if (!form.qualification.trim())
      nextErrors.qualification = "Qualification is required";
    if (!form.experienceYears.trim()) {
      nextErrors.experienceYears = "Experience is required";
    } else if (
      Number.isNaN(Number(form.experienceYears)) ||
      Number(form.experienceYears) < 0
    ) {
      nextErrors.experienceYears = "Enter valid years of experience";
    }
    if (!/^\d{10}$/.test(form.phone))
      nextErrors.phone = "Enter a valid 10-digit phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Enter a valid email address";
    if (!form.address.trim()) nextErrors.address = "Address is required";

    return nextErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CareerFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/career-inquiry", {
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
          data?.error || "Failed to submit application. Please try again.",
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

  const resetForm = () => {
    setSubmitted(false);
    setSubmitError(null);
    setErrors({});
    setForm({
      fullName: "",
      qualification: "",
      experienceYears: "",
      phone: "",
      email: "",
      address: "",
      message: "",
      website: "",
    });
  };

  const inputClass = (field: keyof CareerFormState) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white text-[oklch(0.20_0.02_30)] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[oklch(0.36_0.13_25)] transition-shadow ${
      errors[field] ? "border-red-400" : "border-[oklch(0.88_0.03_70)]"
    }`;

  return (
    <section id="careers" className="py-20 lg:py-28 bg-[oklch(0.94_0.02_80)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <span className="inline-block px-4 py-1 bg-[oklch(0.76_0.13_80)]/30 text-[oklch(0.26_0.11_25)] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Careers
            </span>
            <h2 className="font-serif font-black text-[oklch(0.20_0.02_30)] text-3xl lg:text-4xl xl:text-5xl text-balance mb-5">
              Be Part of a Community That Shapes Futures
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6 text-pretty">
              Our team is the heart of Devarshi Vidhyalaya. We welcome
              thoughtful, skilled, and inspired educators who believe in
              shaping young learners with knowledge and care.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8 text-pretty">
              If you bring experience, enthusiasm, or a fresh perspective to
              teaching, we want to meet you. Send us your details and let&apos;s
              explore the journey together.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Users, label: "Collaborative Culture" },
                { icon: Heart, label: "Purpose-Driven Work" },
                { icon: TrendingUp, label: "Professional Growth Opportunities" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium text-[oklch(0.20_0.02_30)]"
                >
                  <Icon className="w-4 h-4 text-[oklch(0.36_0.13_25)]" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {!formOpen ? (
            <div className="bg-white rounded-3xl shadow-xl shadow-[oklch(0.20_0.02_30)]/10 p-8 border border-border self-center">
              <h3 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-2xl mb-3">
                Ready to Apply?
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Open the career application form and submit your details. It
                takes about 2 to 3 minutes.
              </p>
              <button
                onClick={() => setFormOpen(true)}
                className="w-full px-6 py-3.5 bg-[oklch(0.36_0.13_25)] hover:bg-[oklch(0.26_0.11_25)] text-white font-bold rounded-full transition-colors text-sm shadow-lg"
              >
                Join Our Teaching Team
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl shadow-[oklch(0.20_0.02_30)]/10 p-8 lg:p-10 border border-border">
              {submitted ? (
                <div className="text-center py-10 flex flex-col items-center gap-4">
                  <CheckCircle className="w-14 h-14 text-green-500" />
                  <h3 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-2xl">
                    Application Submitted!
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Thank you for applying. Our HR team will review your details
                    and contact you.
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-2 px-6 py-2.5 border-2 border-[oklch(0.36_0.13_25)] text-[oklch(0.36_0.13_25)] font-semibold rounded-full hover:bg-[oklch(0.36_0.13_25)] hover:text-white transition-colors text-sm"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Career application form"
                >
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <h3 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-xl">
                      Career Application Form
                    </h3>
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="text-xs font-semibold text-[oklch(0.36_0.13_25)] hover:underline"
                    >
                      Close Form
                    </button>
                  </div>

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
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="fullName"
                        className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={handleChange}
                        className={inputClass("fullName")}
                        aria-invalid={!!errors.fullName}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="qualification"
                        className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                      >
                        Qualification <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="qualification"
                        name="qualification"
                        type="text"
                        placeholder="e.g. M.Sc., B.Ed"
                        value={form.qualification}
                        onChange={handleChange}
                        className={inputClass("qualification")}
                        aria-invalid={!!errors.qualification}
                      />
                      {errors.qualification && (
                        <p className="text-red-500 text-xs">
                          {errors.qualification}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="experienceYears"
                        className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                      >
                        Experience (Years){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="experienceYears"
                        name="experienceYears"
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="e.g. 5"
                        value={form.experienceYears}
                        onChange={handleChange}
                        className={inputClass("experienceYears")}
                        aria-invalid={!!errors.experienceYears}
                      />
                      {errors.experienceYears && (
                        <p className="text-red-500 text-xs">
                          {errors.experienceYears}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="phone"
                        className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass("phone")}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs">{errors.phone}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass("email")}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                      >
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows={2}
                        placeholder="Your full address"
                        value={form.address}
                        onChange={handleChange}
                        className={`${inputClass("address")} resize-none`}
                        aria-invalid={!!errors.address}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs">{errors.address}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="text-xs font-semibold text-[oklch(0.20_0.02_30)] uppercase tracking-wide"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Tell us about your profile..."
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
                        Submit Application
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
