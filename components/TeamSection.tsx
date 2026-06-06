'use client'

import { TeamCard } from './TeamCard'
import type { TeamMember } from './TeamCard'

interface TeamSectionProps {
  members: TeamMember[]
}

export function TeamSection({ members }: TeamSectionProps) {
  return (
    <section id="team" className="bg-zinc-50 py-24 dark:bg-primary-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal>
          <span className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
            <span className="h-3 w-1 rounded-full bg-accent" />
            Team
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
            Built by CODE::DEV
          </h2>
          <p className="mt-4 max-w-[65ch] text-balance text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            A Cameroonian team using technology to solve real problems for farmers and communities.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
