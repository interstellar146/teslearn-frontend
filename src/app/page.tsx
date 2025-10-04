'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  BarChart,
  Bot,
  Award,
  Users,
  LineChart,
  PlayCircle,
  Quote,
  Twitter,
  Linkedin,
  Youtube
} from 'lucide-react';
import Image from 'next/image';



// --- Helper Components for this Page ---

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-primary/20 dark:border-secondary/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/15 text-primary mb-6 transform group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-text-light dark:text-white">{title}</h3>
    <p className="text-text-light dark:text-text-dark leading-relaxed">{children}</p>
  </div>
);

const TestimonialCard = ({ quote, name, role, avatarUrl, borderColor }: { quote: string, name: string, role: string, avatarUrl: string, borderColor: string }) => (
    <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-accent/30 dark:border-primary/30 shadow-lg flex flex-col items-start gap-6 transform hover:scale-105 hover:-rotate-1 transition-all duration-300">
        <Quote className="w-12 h-12 text-primary" />
        <blockquote className="flex-1">
            <p className="text-text-light dark:text-text-dark text-lg leading-relaxed">"{quote}"</p>
        </blockquote>
        <div className="flex items-center gap-4">
            <Image alt={`Avatar of ${name}`} className={`w-16 h-16 rounded-full object-cover border-4 ${borderColor} shadow-md`} src={avatarUrl} width={64} height={64} />
            <div>
                <p className="font-bold text-text-light dark:text-white text-lg">{name}</p>
                <p className="text-base text-text-light dark:text-text-dark opacity-80">{role}</p>
            </div>
        </div>
    </div>
);

// --- Footer Component ---
const Footer = () => {
  const productLinks = [
    { href: '#features', label: 'Features' },
    { href: '/upgrade', label: 'Pricing' },
  ];
  const companyLinks = [
    { href: '#', label: 'About Us' },
    { href: '#', label: 'Blog' },
    { href: '#', label: 'Contact Us' },
  ];
  const resourcesLinks = [
    { href: '#', label: 'Help Center' },
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
  ];

  return (
    <footer className="bg-card-dark text-text-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-10 w-10 text-primary" />
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>TesLearn</h1>
            </div>
            <p className="text-base">Learn your way !</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wider uppercase mb-4">Product</h3>
            <nav className="flex flex-col gap-3">
              {productLinks.map(link => <Link key={link.label} href={link.href} className="hover:text-primary transition-colors transform hover:translate-x-1">{link.label}</Link>)}
            </nav>
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wider uppercase mb-4">Company</h3>
            <nav className="flex flex-col gap-3">
              {companyLinks.map(link => <a key={link.label} href={link.href} className="hover:text-primary transition-colors transform hover:translate-x-1">{link.label}</a>)}
            </nav>
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wider uppercase mb-4">Resources</h3>
            <nav className="flex flex-col gap-3">
              {resourcesLinks.map(link => <a key={link.label} href={link.href} className="hover:text-primary transition-colors transform hover:translate-x-1">{link.label}</a>)}
            </nav>
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wider uppercase mb-4">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a aria-label="Twitter" href="#" className="hover:text-primary transition-colors transform hover:scale-125"><Twitter className="w-7 h-7" /></a>
              <a aria-label="LinkedIn" href="#" className="hover:text-primary transition-colors transform hover:scale-125"><Linkedin className="w-7 h-7" /></a>
              <a aria-label="YouTube" href="#" className="hover:text-primary transition-colors transform hover:scale-125"><Youtube className="w-7 h-7" /></a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-primary/20 text-center text-sm">
          <p>© {new Date().getFullYear()} TesLearn. All rights reserved. Built with passion for learning.</p>
        </div>
      </div>
    </footer>
  );
};


export default function LandingPageV2() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
                <Sparkles className="h-10 w-10 text-primary animate-bounce" />
                <h1 className="text-3xl font-bold text-primary dark:text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>TesLearn</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
              <a href="#features" className="hover:text-primary transition-colors transform hover:scale-110">Features</a>
              <a href="#testimonials" className="hover:text-primary transition-colors transform hover:scale-110">Testimonials</a>
              <a href="#pricing" className="hover:text-primary transition-colors transform hover:scale-110">Pricing</a>
            </nav>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="rounded-full border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary px-5 py-2.5">
                <Link href="/auth/login">Log In</Link>
              </Button>
              <Button asChild className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:scale-105 transition-transform">
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button asChild className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:scale-105 transition-transform">
                <Link href="/dashboard">Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 lg:py-40 text-center overflow-hidden">
           <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(106,0,255,0.1),rgba(255,255,255,0))]"></div>
           <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 leading-tight" style={{ fontFamily: "'Fredoka One', cursive" }}>
                The Smartest Way to Learn, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Anything!</span>
              </h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
                TesLearn creates a unique learning path just for you. Master any subject faster with adaptive lessons, interactive exercises, and gamified challenges.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                <Button asChild size="lg" className="px-10 py-8 text-lg font-bold rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-xl hover:scale-105 transition-transform">
                   <Link href="/dashboard">Start Learning for Free!</Link>
                </Button>
                 <Button asChild size="lg" variant="outline" className="px-10 py-8 text-lg font-bold rounded-full border-2 border-accent hover:bg-accent/20">
                    <a href="#features"><PlayCircle className="mr-2"/>Watch Demo</a>
                 </Button>
              </div>
           </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Fredoka One', cursive" }}>Learn Smarter, Not Harder!</h2>
                    <p className="mt-4 text-xl max-w-2xl mx-auto">Our platform is packed with features designed to make learning effective and fun.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <FeatureCard icon={<Sparkles className="w-8 h-8"/>} title="Personalized Learning Paths">Our AI analyzes your skills to create a custom curriculum that adapts as you learn.</FeatureCard>
                    <FeatureCard icon={<BarChart className="w-8 h-8"/>} title="Multi-Modal Content">Engage with text, video, and interactive simulations to suit your learning style.</FeatureCard>
                    <FeatureCard icon={<Bot className="w-8 h-8"/>} title="AI-Powered Focus Mode">A minimalist UI helps you stay focused and in the flow, minimizing distractions.</FeatureCard>
                    <FeatureCard icon={<Award className="w-8 h-8"/>} title="Gamified Experience">Earn points, unlock achievements, and climb leaderboards. Learning has never been this addictive!</FeatureCard>
                    <FeatureCard icon={<Users className="w-8 h-8"/>} title="For All Learners">Perfect for students, professionals upskilling, and lifelong learners exploring new passions.</FeatureCard>
                    <FeatureCard icon={<LineChart className="w-8 h-8"/>} title="Progress Analytics">Visualize your strengths and weaknesses with detailed reports and insights from our AI.</FeatureCard>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Fredoka One', cursive" }}>Loved by Learners Worldwide!</h2>
                    <p className="mt-4 text-xl max-w-2xl mx-auto">Don't just take our word for it. Here's what our users are saying.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <TestimonialCard quote="TesLearn is a game-changer! The adaptive learning is incredible. I'm finally understanding complex topics I've struggled with for years." name="Alex Johnson" role="University Student" avatarUrl="https://i.pravatar.cc/150?u=alex" borderColor="border-secondary" />
                    <TestimonialCard quote="The gamification keeps me coming back every day. I'm actually excited to study now, which is something I never thought I'd say!" name="Maria Garcia" role="Software Developer" avatarUrl="https://i.pravatar.cc/150?u=maria" borderColor="border-primary" />
                    <TestimonialCard quote="As a lifelong learner, TesLearn is perfect. The platform's design is so clean and distraction-free. I can just focus on learning." name="Samuel Chen" role="Marketing Manager" avatarUrl="https://i.pravatar.cc/150?u=samuel" borderColor="border-accent" />
                </div>
            </div>
        </section>
        
        {/* Pricing Section Link */}
        <section id="pricing" className="py-20 md:py-24 text-center">
            <div className="container mx-auto px-4">
                 <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Fredoka One', cursive" }}>Ready to Revolutionize Your Learning?</h2>
                 <p className="mt-4 text-xl max-w-2xl mx-auto mb-8">Join millions of learners on the path to mastery. Your personalized journey starts now!</p>
                 <Button asChild size="lg" className="px-10 py-8 text-lg font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:scale-105 transition-transform">
                    <Link href="/upgrade">View Pricing Plans</Link>
                 </Button>
            </div>
        </section>
      </main>

      {/* Use the new Footer component */}
      <Footer />
    </div>
  );
}

