'use client'

import Image from 'next/image'
import { FaLinkedinIn, FaGithub, FaFacebookF, FaXTwitter, FaInstagram } from 'react-icons/fa6'
import type { StaticImageData } from 'next/image'

export interface TeamMember {
  id: string
  name: string
  role: string
  image: StaticImageData
  linkedin?: string
  github?: string
  facebook?: string
  twitter?: string
  instagram?: string
}

interface TeamCardProps {
  member: TeamMember
  index?: number
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  instagram: FaInstagram,
}

export function TeamCard({ member, index = 0 }: TeamCardProps) {
  return (
    <div
      data-reveal
      data-delay={`${index * 80}ms`}
      className="group/card rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-md dark:bg-white/5 dark:ring-white/[0.08]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-105"
        />
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-sm font-semibold text-primary dark:text-white">
            {member.name}
          </h3>
          <p className="mt-0.5 text-xs text-accent-dark dark:text-accent">
            {member.role}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {Object.entries(socialIcons).map(([platform, Icon]) => {
            const url = member[platform as keyof TeamMember] as string | undefined
            if (!url) return null
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                className="text-zinc-400 transition-colors duration-200 hover:text-accent-dark dark:hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
