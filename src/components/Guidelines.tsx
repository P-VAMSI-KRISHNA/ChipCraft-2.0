const guidelines = [
  {
    number: 1,
    title: "HACKATHON STRUCTURE",
    points: [
      "The hackathon is open to registered participants forming teams as per the event registration guidelines.",
      "The hackathon will run continuously for 24 hours.",
      "Problem statements will be released by the organizers at the beginning of the event.",
      "Each team must select one problem statement from the list provided during the event.",
      "All design and development activities must be carried out during the official hackathon duration.",
    ],
  },
  {
    number: 2,
    title: "ACADEMIC INTEGRITY AND ETHICS",
    points: [
      "All solutions submitted must represent the original work of the participating team.",
      "Participants must not copy solutions from other teams or share design files.",
      "External assistance that violates the spirit of fair participation is not permitted.",
      "Teams are responsible for ensuring the authenticity and integrity of their submissions.",
    ],
  },
  {
    number: 3,
    title: "CODE OF CONDUCT",
    points: [
      "Participants are expected to maintain professional conduct and mutual respect throughout the event.",
      "Respect must be shown towards fellow participants, mentors, judges, and organizing staff.",
      "Any form of misconduct, disruptive behaviour, or harassment will not be tolerated.",
      "Participants must comply with all instructions issued by the organizing committee during the event.",
    ],
  },
  {
    number: 4,
    title: "LABORATORY CONDUCT",
    points: [
      "Participants must remain within the designated laboratory area during the event.",
      "If a participant needs to leave the laboratory premises, the organizing team must be informed in advance.",
      "Participants must maintain discipline and a productive working environment in the laboratory.",
      "Instructions from event coordinators and technical staff must be followed at all times.",
    ],
  },
  {
    number: 5,
    title: "CLEANLINESS AND SAFETY",
    points: [
      "Participants must keep the laboratory environment clean and organized.",
      "Waste materials such as food wrappers, bottles, or paper must be disposed of in designated bins.",
      "Participants must not leave waste or unnecessary items on workstations or laboratory floors.",
      "Maintaining a safe and comfortable environment is the responsibility of all participants.",
    ],
  },
  {
    number: 6,
    title: "USE OF SYSTEMS AND FACILITIES",
    points: [
      "Workstation and infrastructure provided by the organizers must be used only for hackathon activities.",
      "Participants must not modify system configurations or install additional software on the provided systems.",
      "Any misuse or intentional damage to laboratory equipment, systems, or network infrastructure is strictly prohibited.",
      "Participants must ensure that the workspace is maintained in a clean and orderly manner.",
    ],
  },
  {
    number: 7,
    title: "SUPPORT AND ASSISTANCE",
    points: [
      "Organizers and technical volunteers will be available during the event to assist participants with general coordination and technical environment issues.",
      "Participants may approach organizers for clarifications regarding the event.",
      "Basic first-aid and essential medical assistance will be available if required during the hackathon.",
    ],
  },
  {
    number: 8,
    title: "ORGANIZER AUTHORITY",
    points: [
      "The organizing committee reserves the right to clarify guidelines, modify schedules, or issue additional instructions if required.",
      "Participants are expected to comply with any directions issued for the smooth conduct of the event.",
      "Decisions taken by the organizing committee and evaluation panel will be final and binding.",
    ],
  },
];

const Guidelines = () => {
  return (
    <section id="guidelines" className="py-12 sm:py-20 bg-paper">
      <div className="container px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-8 sm:mb-12 max-w-2xl text-center">
          <h2
            className="font-rye text-3xl sm:text-4xl md:text-5xl text-foreground uppercase tracking-wide mb-2"
            style={{ textShadow: "2px 2px 0px hsl(var(--card))" }}
          >
            ChipCraft 2.0
          </h2>
          <div className="inline-block bg-foreground text-background px-6 sm:px-10 py-2 sm:py-3">
            <span className="font-rye text-lg sm:text-2xl tracking-widest uppercase">
              Guidelines
            </span>
          </div>
        </div>

        {/* Guidelines Grid */}
        <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
          {guidelines.map((guideline) => (
            <div
              key={guideline.number}
              className="relative border-2 border-foreground/30 bg-card/40 p-4 sm:p-6 transition-all hover:border-foreground/50 hover:bg-card/60"
            >
              {/* Number Badge — vintage sack / stamp style */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 flex flex-col items-center z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground/85 text-background flex items-center justify-center shadow-md border-2 border-foreground">
                  <span className="font-rye text-sm sm:text-base">
                    {guideline.number}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-foreground/70 shrink-0" />
                <h3 className="inline-block bg-foreground/85 text-background px-3 py-1 font-sans font-bold text-xs sm:text-sm tracking-widest uppercase">
                  {guideline.title}
                </h3>
              </div>

              {/* Points */}
              <ul className="space-y-2 sm:space-y-2.5 pl-1 sm:pl-2">
                {guideline.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <span className="mt-1.5 sm:mt-2 w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0" />
                    <p className="font-serif text-sm sm:text-base text-foreground/85 leading-relaxed">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guidelines;
