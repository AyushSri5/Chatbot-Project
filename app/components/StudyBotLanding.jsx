'use client'
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  MessageCircle,
  Brain,
  Users,
  Star,
  Zap,
  GraduationCap,
  Code,
  Video,
  ChevronRight,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const StudyBotLanding = () => {
  const { isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignIn = () => {
    window.location.href = "/dashboard";
  };

  const handleSignUp = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-indigo-500 rounded-full filter blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Floating code elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 text-blue-400/20 font-mono text-sm animate-float">
          const learn = () =&gt; {"{"}
          <br />
          &nbsp;&nbsp;return success;
          <br />
          {"}"};
        </div>
        <div className="absolute bottom-40 left-1/4 text-purple-400/20 font-mono text-sm animate-float delay-1000">
          &lt;StudyBot /&gt;
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white">StudyBot</span>
            <p className="text-xs text-blue-300">AI Learning Assistant</p>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-6">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 mb-8 shadow-lg">
            <Zap className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-sm font-medium">Powered by Advanced AI • 24/7 Support</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Your Personal
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Study Assistant
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get instant help with your <span className="text-blue-300 font-semibold">Hitesh Chaudhary</span> and{" "}
            <span className="text-purple-300 font-semibold">Piyush Garg</span> Udemy courses. 
            Ask questions, clarify doubts, and accelerate your learning journey.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <span className="text-white/90">Instant Doubt Resolution</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Code className="w-4 h-4 text-green-400" />
              <span className="text-white/90">Code Debugging Help</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span className="text-white/90">Personalized Learning</span>
            </div>
          </div>

          {/* CTA Buttons */}
          {mounted && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              {!isSignedIn ? (
                <>
                  <button
                    onClick={handleSignUp}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 text-lg"
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>Start Learning Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={handleSignIn}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 text-lg"
                  >
                    <span>Sign In</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 text-lg"
                >
                  <Brain className="w-5 h-5" />
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default StudyBotLanding;
