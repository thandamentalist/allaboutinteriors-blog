import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type PortableTextBlock } from "next-sanity";
import { Suspense } from "react";
import Link from "next/link";

import Avatar from "@/app/components/Avatar";
import CoverImage from "@/app/components/CoverImage";
import { MorePosts } from "@/app/components/Posts";
import PortableText from "@/app/components/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { postPagesSlugs, postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const [{ data: post }] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Navigation */}
      <nav className="bg-[#FAF9F6] border-b border-[#D69FA2]/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-serif text-2xl font-bold text-[#111111]">
              AllAboutInteriors.ai
            </Link>
            <div className="flex items-center space-x-8">
              <Link href="/posts" className="text-[#111111] hover:text-[#D69FA2] transition-colors">
                Articles
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-4xl">
          {/* Header - Left aligned */}
          <header className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] tracking-tight leading-tight mb-6">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-[#111111] leading-relaxed mb-8 max-w-3xl">
                {post.excerpt}
              </p>
            )}

            {post.author && post.author.firstName && post.author.lastName && (
              <div className="flex items-center mb-8">
                <Avatar person={post.author} date={post.date} />
              </div>
            )}
          </header>

          {/* Cover Image - Full width */}
          {post?.coverImage && (
            <div className="mb-12 -mx-6">
              <CoverImage image={post.coverImage} priority />
            </div>
          )}

          {/* Content - Left aligned, constrained width */}
          {post.content?.length && (
            <div className="max-w-3xl">
              <div className="prose prose-lg prose-gray max-w-none font-sans text-[#111111] leading-relaxed">
                <PortableText value={post.content as PortableTextBlock[]} />
              </div>
            </div>
          )}
        </div>
      </article>

      {/* More Posts */}
      <div className="border-t border-[#D69FA2]/20 bg-[#FAF9F6] mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="font-serif text-3xl font-bold text-[#111111] mb-8">
            More Articles
          </h2>
          <Suspense fallback={<div>Loading...</div>}>
            {await MorePosts({ skip: post._id, limit: 2 })}
          </Suspense>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2E3A59] text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2025 AllAboutInteriors.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}