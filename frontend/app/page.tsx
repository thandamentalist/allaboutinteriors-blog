'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Homepage() {
  const [showNewsletter, setShowNewsletter] = useState(true)

  // Mock data - replace with actual Sanity data later
  const featuredPosts = [
    {
      id: 1,
      title: "How to Become an Interior Designer",
      excerpt: "Taking a decision for your future, your career is always a big step that we underestimate. At least I did.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center",
      slug: "how-to-become-an-interior-designer"
    },
    {
      id: 2,
      title: "Best Interior Design Software in 2025",
      excerpt: "A comprehensive guide to the tools that actually matter for modern interior designers.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center",
      slug: "best-interior-design-software"
    },
    {
      id: 3,
      title: "Small Space Design That Actually Works",
      excerpt: "Forget the Pinterest myths. Here's what really works in spaces under 500 square feet.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center",
      slug: "small-space-design"
    }
  ]

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Navigation */}
      <nav className="bg-[#FAF9F6] border-b border-[#D69FA2]/20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-serif text-2xl font-bold text-[#111111]">
              AllAboutInteriors.ai
            </Link>
            <div className="flex items-center space-x-8">
              <Link href="/posts" className="text-[#111111] hover:text-[#D69FA2] transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-[#111111] hover:text-[#D69FA2] transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-[#111111] hover:text-[#D69FA2] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#111111] tracking-tight leading-tight mb-6">
          Beautiful Rabbit Holes for Everyone Who Cares About Spaces
        </h1>
        <h2 className="font-sans text-xl md:text-2xl text-[#111111] leading-relaxed mb-8 max-w-3xl mx-auto">
          Interior design tools, ideas, and opinions—for designers, builders, homeowners, and the obsessed.
        </h2>
        <Link 
          href="/posts" 
          className="inline-block bg-[#2E3A59] text-white px-8 py-3 font-sans font-medium hover:bg-[#D69FA2] transition-colors"
        >
          Start Exploring
        </Link>
      </section>

      {/* Hero Image */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=675&fit=crop&crop=center"
            alt="Beautiful modern interior space"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Sticky Newsletter Teaser */}
      {showNewsletter && (
        <div className="fixed bottom-8 right-8 bg-[#FBEADA] p-6 max-w-sm shadow-lg z-50">
          <button 
            className="absolute top-2 right-2 text-[#111111] hover:text-[#D69FA2] text-xl leading-none"
            onClick={() => setShowNewsletter(false)}
          >
            ×
          </button>
          <h3 className="font-serif text-lg font-bold text-[#111111] mb-2">
            Never Miss a Rabbit Hole
          </h3>
          <p className="text-sm text-[#111111] mb-4">
            Get the latest design insights delivered to your inbox.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 text-sm border border-[#D69FA2]/30 bg-white"
            />
            <button className="bg-[#2E3A59] text-white px-4 py-2 text-sm font-medium hover:bg-[#D69FA2] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      )}

      {/* Featured Posts Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl font-bold text-[#111111] mb-12 text-center">
          Latest Rabbit Holes
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/posts/${post.slug}`}>
                <div className="relative aspect-[4/3] mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#111111] mb-2 group-hover:text-[#D69FA2] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#111111] leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/posts" 
            className="inline-block text-[#A07CA0] font-medium hover:text-[#D69FA2] transition-colors border-b border-[#A07CA0] hover:border-[#D69FA2]"
          >
            View All Posts
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2E3A59] text-white py-12 mt-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-lg font-bold mb-4">About</h3>
              <p className="text-sm opacity-90">
                Interior design insights for the obsessed. No fluff, just value.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/posts" className="hover:text-[#D69FA2] transition-colors">Blog</Link></li>
                <li><Link href="/about" className="hover:text-[#D69FA2] transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-[#D69FA2] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#D69FA2] transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-[#D69FA2] transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-[#D69FA2] transition-colors">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-[#D69FA2] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#D69FA2] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2025 AllAboutInteriors.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}