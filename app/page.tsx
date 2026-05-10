"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Menu,
  MessageCircleMore,
  Mic,
  Phone,
  Play,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

export default function CallsChatLandingPage() {
  const [open, setOpen] = useState(false);

  return (
    <main className="bg-[#FFFFFF] text-[#0F172A] overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-[#38BDF8]/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
          className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-[#2563EB]/20 rounded-full blur-3xl"
        />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-white/20">
        <div className="max-w-7xl mx-auto h-20 px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB] flex items-center justify-center shadow-2xl shadow-blue-300">
              <Phone className="text-white w-5 h-5" />
            </div>

            <div>
              <h1 className="text-2xl font-black">
                CallsChat
              </h1>

              <p className="text-xs text-gray-500">
                Launching Soon
              </p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-10 font-semibold">
            <a
              href="#features"
              className="hover:text-[#2563EB] transition"
            >
              Features
            </a>

            <a
              href="#waitlist"
              className="hover:text-[#2563EB] transition"
            >
              Waitlist
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
  href="#features"
  className="bg-[#2563EB] text-white py-3 px-6 rounded-2xl inline-flex items-center justify-center"
>
  Join Waitlist
</a>
          </div>

          {/* Mobile */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          className="overflow-hidden lg:hidden bg-white"
        >
          <div className="flex flex-col gap-5 p-6 font-semibold">
            <a href="#features">Features</a>
            <a href="#waitlist">Waitlist</a>

    <a
  href="#features"
  className="bg-[#2563EB] text-white py-3 px-6 rounded-2xl inline-flex items-center justify-center"
>
  Join Waitlist
</a>
          </div>
        </motion.div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-10 pt-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] font-semibold">
              <Sparkles className="w-4 h-4" />
              Building The Future Of Communication
            </div>

            <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight">
              Calls & Chats
              <br />
              Reimagined.
            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-xl">
              CallsChat is an upcoming modern communication
              platform focused on fast messaging, smooth voice
              calls, and a beautiful user experience.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-5">
              <button className="group px-8 py-5 rounded-2xl bg-[#2563EB] text-white font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-300">
                Join Waitlist
                <ArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
              </button>

              <button className="px-8 py-5 rounded-2xl border border-gray-200 font-bold flex items-center justify-center gap-3 hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-300">
                <Play className="w-5 h-5" />
                Watch Preview
              </button>
            </div>

            {/* Floating Tags */}
            <div className="mt-14 flex flex-wrap gap-4">
              {[
                "Modern UI",
                "Fast Messaging",
                "Voice Calls",
                "Secure",
                "Smooth Experience",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2 + i,
                    repeat: Infinity,
                  }}
                  className="px-5 py-3 rounded-2xl bg-white shadow-lg border border-gray-100 font-medium"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            {/* Glow */}
            <div className="absolute w-[500px] h-[500px] bg-[#2563EB]/20 rounded-full blur-3xl"></div>

            {/* Phone */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="relative z-10 bg-[#0F172A] p-4 rounded-[3rem] border-[10px] border-gray-900 shadow-[0_40px_100px_rgba(37,99,235,0.35)]"
            >
              <div className="w-[320px] md:w-[360px] rounded-[2.5rem] overflow-hidden bg-white">
                {/* Top */}
                <div className="bg-[#2563EB] p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-black">
                        CallsChat
                      </h2>

                      <p className="text-blue-100 text-sm">
                        Early Preview
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Mic className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Chat UI */}
                <div className="bg-gray-50 p-5 space-y-5 min-h-[520px]">
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="bg-white rounded-3xl p-4 shadow-sm w-fit max-w-[80%]"
                  >
                    <p className="font-medium">
                      Welcome to CallsChat 👋
                    </p>
                  </motion.div>

                  <motion.div
                    animate={{
                      x: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                    className="bg-[#2563EB] text-white rounded-3xl p-4 shadow-sm ml-auto w-fit max-w-[80%]"
                  >
                    <p className="font-medium">
                      Something amazing is coming 🚀
                    </p>
                  </motion.div>

                  <div className="flex gap-3 items-center bg-white p-4 rounded-3xl shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <Shield className="text-[#2563EB]" />
                    </div>

                    <div>
                      <h4 className="font-bold">
                        Privacy Focused
                      </h4>

                      <p className="text-sm text-gray-500">
                        Secure communication experience
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center bg-white p-4 rounded-3xl shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center">
                      <Bell className="text-[#38BDF8]" />
                    </div>

                    <div>
                      <h4 className="font-bold">
                        Real-time Updates
                      </h4>

                      <p className="text-sm text-gray-500">
                        Smooth & modern interactions
                      </p>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="mt-10 flex items-center gap-3 bg-white rounded-3xl px-5 py-4 shadow-sm">
                    <MessageCircleMore className="text-gray-400" />

                    <input
                      placeholder="Message..."
                      className="bg-transparent outline-none flex-1"
                    />

                    <button className="w-11 h-11 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="hidden lg:flex absolute -left-20 top-24 bg-white rounded-3xl p-5 shadow-2xl gap-4 items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Phone className="text-[#2563EB]" />
                </div>

                <div>
                  <h4 className="font-bold">
                    Voice Calling
                  </h4>

                  <p className="text-sm text-gray-500">
                    Smooth communication
                  </p>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="hidden lg:flex absolute -right-20 bottom-24 bg-white rounded-3xl p-5 shadow-2xl gap-4 items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center">
                  <Sparkles className="text-[#38BDF8]" />
                </div>

                <div>
                  <h4 className="font-bold">
                    Modern Experience
                  </h4>

                  <p className="text-sm text-gray-500">
                    Beautiful & responsive UI
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-28 px-6 lg:px-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-black">
              Why CallsChat?
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              Designed to feel modern, smooth, and fast.
            </p>
          </div>

          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Phone />,
                title: "Voice Calls",
                desc: "Smooth and clean calling experience.",
              },
              {
                icon: <MessageCircleMore />,
                title: "Fast Messaging",
                desc: "Real-time modern communication.",
              },
              {
                icon: <Shield />,
                title: "Secure",
                desc: "Focused on privacy and safety.",
              },
            ].map((item, index) => (
              <motion.div
                whileHover={{
                  y: -10,
                }}
                key={index}
                className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-lg"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2563EB]">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-2xl font-black">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section
        id="waitlist"
        className="px-6 lg:px-10 pb-28"
      >
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-r from-[#2563EB] to-[#38BDF8] p-10 lg:p-20 text-center text-white relative overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-72 h-72 border border-white/20 rounded-full top-[-120px] right-[-120px]"
          />

          <h2 className="text-4xl lg:text-6xl font-black relative z-10">
            CallsChat Is
            <br />
            Coming Soon 🚀
          </h2>

          <p className="mt-6 text-lg text-blue-50 max-w-2xl mx-auto relative z-10">
            We are currently building something beautiful for
            the next generation of communication.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto relative z-10">
            

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">
          <div>
            <h2 className="text-2xl font-black">
              CallsChat
            </h2>

            <p className="text-gray-500 mt-2">
              Modern communication platform.
            </p>
          </div>

          <p className="text-gray-500 text-sm">
            © 2026 CallsChat. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}