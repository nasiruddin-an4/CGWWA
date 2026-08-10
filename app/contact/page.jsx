"use client";

import React, { useState } from "react";
import { organizationInfo } from "@/data/organization";
import { useLanguage } from "@/context/LanguageContext";
import * as Icons from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-20">

      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-24 lg:pb-32 overflow-hidden bg-brandBlue max-w-7xl mx-auto rounded-md mt-8 lg:mt-12 shadow-xl border border-white/10">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
            alt="Office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brandBlue/90 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandYellow/10 backdrop-blur-md border border-brandYellow/20 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-brandYellow">
              {t("Support & Services", "সাপোর্ট ও সার্ভিস")}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white mb-6">
            {t("Institutional Contact", "যোগাযোগ করুন")}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto">
            {t(
              "Get in touch with CGFWA headquarters, submit public inquiries, or reach our regional field wings.",
              "সিজিএফডব্লিউএ প্রধান কার্যালয় ও আঞ্চলিক তথ্য সেবা কেন্দ্রসমূহের সাথে যোগাযোগ করুন।"
            )}
          </p>
        </div>
      </section>

      {/* 2. CONTACT CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-20 -mt-12 lg:-mt-20">

          {/* Left Col: Contact Info & Branches */}
          <div className="lg:col-span-5 space-y-6">

            {/* Headquarters Card */}
            <div className="bg-white rounded-md p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-serif font-bold text-brandBlue mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brandBlue/5 flex items-center justify-center">
                  <Icons.Building className="w-5 h-5 text-brandYellow" />
                </div>
                {t("Headquarters", "প্রধান কার্যালয়")}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <Icons.MapPin className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm mb-1">{t("CGFWA Bhaban", "সিজিএফডব্লিউএ ভবন")}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {language === "bn" ? organizationInfo.headquarters.addressBn : organizationInfo.headquarters.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <Icons.Phone className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm mb-1">{t("Phone", "ফোন")}</p>
                    <p className="text-slate-500 text-sm font-medium">
                      {organizationInfo.headquarters.phone[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <Icons.Mail className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm mb-1">{t("Email", "ইমেইল")}</p>
                    <p className="text-slate-500 text-sm font-medium">
                      {organizationInfo.headquarters.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <Icons.Clock className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm mb-1">{t("Office Hours", "অফিস সময়")}</p>
                    <p className="text-slate-500 text-sm">
                      {t("Sun - Thu: 9:00 AM - 5:00 PM", "রবি - বৃহস্পতি: ৯:০০ এএম - ৫:০০ পিএম")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Wings Card */}
            <div className="bg-slate-900 rounded-md p-8 shadow-xl border border-slate-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 bg-brandYellow/10 rounded-bl-full blur-3xl mix-blend-screen opacity-50"></div>

              <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                <Icons.Map className="w-5 h-5 text-brandYellow" />
                {t("Regional Wings", "আঞ্চলিক কার্যালয়")}
              </h3>

              <div className="space-y-4 relative z-10">
                <div className="p-4 bg-white/5 rounded-md border border-white/10 hover:bg-white/10 transition-colors">
                  <p className="font-bold text-brandYellow text-sm mb-1">{t("Patuakhali & Barguna Field Office", "পটুয়াখালী ও বরগুনা অফিস")}</p>
                  <p className="text-slate-400 text-xs">District Auditorium Road, Patuakhali</p>
                </div>
                <div className="p-4 bg-white/5 rounded-md border border-white/10 hover:bg-white/10 transition-colors">
                  <p className="font-bold text-brandYellow text-sm mb-1">{t("Satkhira Sundarbans Field Wing", "সাতক্ষীরা সুন্দরবন উইং")}</p>
                  <p className="text-slate-400 text-xs">College Road, Shyamnagar, Satkhira</p>
                </div>
                <div className="p-4 bg-white/5 rounded-md border border-white/10 hover:bg-white/10 transition-colors">
                  <p className="font-bold text-brandYellow text-sm mb-1">{t("Cox's Bazar Marine Station", "কক্সবাজার সামুদ্রিক স্টেশন")}</p>
                  <p className="text-slate-400 text-xs">Main Road, Moheshkhali, Cox's Bazar</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Col: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-md p-8 md:p-12 shadow-xl border border-slate-100">
              <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-brandBlue mb-4">
                  {t("Public Inquiry Cell", "সাধারণ জিজ্ঞাসা")}
                </h2>
                <p className="text-slate-500 leading-relaxed">
                  {t(
                    "Submit official queries regarding stipends, relief packages, or organizational participation. Our team will respond within 48 hours.",
                    "উপবৃত্তি, ত্রাণ বা সংস্থায় আবেদনের বিষয়ে আপনার বার্তা পাঠান। আমাদের টিম ৪৮ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।"
                  )}
                </p>
              </div>

              {submitted ? (
                <div className="bg-slate-50 rounded-md p-12 text-center border border-slate-100 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <Icons.CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-800 mb-3">
                    {t("Inquiry Submitted Successfully!", "আপনার আবেদন সফলভাবে গৃহীত হয়েছে!")}
                  </h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    {t(
                      "Your query has been securely transmitted to the secretariat. A representative will reach out to you shortly.",
                      "আপনার বার্তা আমাদের টিমের কাছে পাঠানো হয়েছে। খুব শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব।"
                    )}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-brandBlue text-white font-bold rounded-md hover:bg-slate-800 transition-colors shadow-md"
                  >
                    {t("Send Another Message", "নতুন বার্তা পাঠান")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">
                        {t("Full Name", "সম্পূর্ণ নাম")} <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Icons.User className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t("e.g. John Doe", "উদাঃ মোঃ রফিকুল ইসলাম")}
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 font-medium focus:bg-white focus:border-brandYellow focus:ring-4 focus:ring-brandYellow/20 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">
                        {t("Email Address", "ইমেইল")} <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Icons.Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t("e.g. email@example.com", "উদাঃ email@example.com")}
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 font-medium focus:bg-white focus:border-brandYellow focus:ring-4 focus:ring-brandYellow/20 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      {t("Subject", "বিষয়")} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icons.MessageSquare className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={t("How can we help you?", "আপনি কী বিষয়ে জানতে চান?")}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 font-medium focus:bg-white focus:border-brandYellow focus:ring-4 focus:ring-brandYellow/20 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      {t("Message", "বার্তা")} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t("Write your detailed inquiry here...", "আপনার বিস্তারিত প্রশ্ন এখানে লিখুন...")}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-md text-slate-700 font-medium focus:bg-white focus:border-brandYellow focus:ring-4 focus:ring-brandYellow/20 transition-all outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-4 bg-brandYellow text-slate-900 rounded-md font-black tracking-wide uppercase hover:bg-brandYellowDark transition-all shadow-xl shadow-brandYellow/20 flex items-center justify-center gap-3 group"
                    >
                      {t("Submit Message", "বার্তা পাঠান")}
                      <Icons.Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}