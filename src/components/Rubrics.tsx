import { useState } from "react";

interface RubricCriteria {
  id: string;
  criteria: string;
  explanation: string;
  excellent: string;
  veryGood: string;
  good: string;
  satisfactory: string;
}

interface RoundRubric {
  round: number;
  title: string;
  totalMarks: string;
  excellentLabel: string;
  criteria: RubricCriteria[];
}

const rubrics: RoundRubric[] = [
  {
    round: 1,
    title: "Problem Statement & Ideation",
    totalMarks: "20M",
    excellentLabel: "Excellent (4)",
    criteria: [
      {
        id: "r1-1",
        criteria: "Problem Relevance",
        explanation: "Clarity of Problem, Relevance to Problem and Community Impact",
        excellent: "Problem precisely defined with clear objectives, strongly aligned with a critical issue and demonstrates a major positive impact on large community",
        veryGood: "The problem is well defined with minor ambiguity, relevant and meaningful to the community, and provides noticeable benefits to specific groups",
        good: "Problem somewhat clear but lacks depth, Moderately relevant and demonstrates limited positive effects",
        satisfactory: "Problem vague or unclear, Weak or unclear relevance and minimal impact",
      },
      {
        id: "r1-2",
        criteria: "Solution Effectiveness",
        explanation: "Innovation and Creativity, Effectiveness and Feasibility",
        excellent: "Highly innovative and unique approach, fully addresses the core issue and highly practical and implementable",
        veryGood: "Some creative elements, addresses issue with minor gaps and Feasible with minor challenges",
        good: "Common but effective approach, addresses partially and Requires moderate changes",
        satisfactory: "Conventional or lacks creativity, Limited or no impact on problem, Impractical or not feasible",
      },
      {
        id: "r1-3",
        criteria: "Sustainability",
        explanation: "Environmental Impact, Social Impact and Economic Viability",
        excellent: "Environmentally friendly with positive effects, Strong positive social outcomes and Cost-effective and self-sustaining",
        veryGood: "Minimal negative impact, Moderate social benefits and affordable with moderate cost",
        good: "Some concern but manageable, Limited benefit to society and Moderate cost with limited return",
        satisfactory: "Negative or no concern for environment, No significant benefit and unsustainable",
      },
      {
        id: "r1-4",
        criteria: "Implementation Plan",
        explanation: "Technologies Used, target beneficiaries and scalability",
        excellent: "Appropriate, advanced, and relevant technologies used, Clearly identified and addressed, Easily scalable to larger contexts",
        veryGood: "Technologies well chosen, Identified with partial clarity and Scalable with minor changes",
        good: "Adequate but basic tools used, Somewhat identified and Limited scalability",
        satisfactory: "Inappropriate or outdated tools, Not clearly identified and Not scalable",
      },
      {
        id: "r1-5",
        criteria: "Presentation",
        explanation: "Clarity and Organization, Visual Aids and Engagement",
        excellent: "Exceptionally clear, logical, and organized, High-quality, informative visuals and Highly engaging and convincing",
        veryGood: "Well structured, Relevant visuals used effectively and Interesting and clear",
        good: "Somewhat organized, Minimal or unclear visuals and Some engagement",
        satisfactory: "Poorly organized, poor visuals and Lacks engagement",
      },
    ],
  },
  {
    round: 2,
    title: "RTL Simulation & Verification",
    totalMarks: "24M",
    excellentLabel: "Excellent (5)",
    criteria: [
      {
        id: "r2-1",
        criteria: "RTL Design Quality",
        explanation: "Structure, modularity, and adherence to design specifications",
        excellent: "RTL code is well-structured, modular, fully compliant with design specs, and optimized for synthesis",
        veryGood: "RTL is mostly modular and meets specifications with minor deviations",
        good: "RTL meets basic functionality but lacks modularity or optimization",
        satisfactory: "RTL has major design flaws or poor structure",
      },
      {
        id: "r2-2",
        criteria: "Coding Standards and Documentation",
        explanation: "Coding practices, naming conventions, and clarity of comments",
        excellent: "Follows all HDL coding standards with clear comments and meaningful naming",
        veryGood: "Follows most standards with adequate commenting",
        good: "Basic standards followed; limited documentation",
        satisfactory: "Poor coding style; lacks documentation",
      },
      {
        id: "r2-3",
        criteria: "Testbench Design",
        explanation: "Quality and completeness of the testbench",
        excellent: "Comprehensive testbench with self-checking mechanisms and clear structure",
        veryGood: "Good testbench covering most cases with minor missing checks",
        good: "Functional testbench with limited cases",
        satisfactory: "Incomplete or non-functional testbench",
      },
      {
        id: "r2-4",
        criteria: "Functional Verification",
        explanation: "Accuracy and coverage of test results",
        excellent: "100% functionality verified with high coverage and no mismatches",
        veryGood: "Verification covers most functions with minimal mismatches",
        good: "Partial verification with several untested cases",
        satisfactory: "Verification incomplete or incorrect",
      },
      {
        id: "r2-5",
        criteria: "Debugging and Issue Resolution",
        explanation: "Ability to identify and fix design/verification issues",
        excellent: "Issues promptly identified and efficiently resolved",
        veryGood: "Minor delays in debugging; most issues resolved",
        good: "Issues identified but partially resolved",
        satisfactory: "Major unresolved issues or ineffective debugging",
      },
      {
        id: "r2-6",
        criteria: "Simulation and Reporting",
        explanation: "Simulation results, waveform clarity, and result interpretation",
        excellent: "Simulation runs error-free; waveforms are clear and results are well-documented",
        veryGood: "Minor simulation warnings; results clearly interpreted",
        good: "Simulation produces results with limited clarity",
        satisfactory: "Frequent errors or unclear/uninterpreted results",
      },
    ],
  },
  {
    round: 3,
    title: "Synthesis & Netlist Generation",
    totalMarks: "28M",
    excellentLabel: "Excellent (4)",
    criteria: [
      {
        id: "r3-1",
        criteria: "Synthesis Environment Setup",
        explanation: "Accuracy of library linking, constraints definition, and setup environment",
        excellent: "All synthesis constraints, libraries, and environment set up accurately without errors",
        veryGood: "Setup mostly correct with minor warnings",
        good: "Partial setup with missing parameters",
        satisfactory: "Incomplete or incorrect setup",
      },
      {
        id: "r3-2",
        criteria: "Command and Tool Proficiency",
        explanation: "Correct and efficient use of DC commands and flow sequence",
        excellent: "Commands executed efficiently; complete understanding of synthesis flow",
        veryGood: "Correct commands with minor syntax or sequence errors",
        good: "Basic commands used; partial tool understanding",
        satisfactory: "Incorrect or limited command usage",
      },
      {
        id: "r3-3",
        criteria: "Timing Optimization",
        explanation: "Meeting setup/hold timing constraints and minimizing violations",
        excellent: "All critical paths optimized; positive slack achieved",
        veryGood: "Minor timing violations with near-ideal optimization",
        good: "Moderate timing issues remaining",
        satisfactory: "Major timing violations; poor optimization",
      },
      {
        id: "r3-4",
        criteria: "Area and Power Optimization",
        explanation: "Minimizing area and power consumption through design refinements",
        excellent: "Optimal area and power achieved with justification",
        veryGood: "Balanced trade-off between area and power",
        good: "Moderate optimization achieved",
        satisfactory: "No optimization or excessive area/power usage",
      },
      {
        id: "r3-5",
        criteria: "Report Analysis and Interpretation",
        explanation: "Ability to interpret DC reports (timing, area, power)",
        excellent: "Reports analyzed thoroughly with accurate insights",
        veryGood: "Good interpretation with minor gaps",
        good: "Partial report understanding",
        satisfactory: "Misinterpreted or incomplete analysis",
      },
      {
        id: "r3-6",
        criteria: "EDA Flow Understanding",
        explanation: "Conceptual understanding of end-to-end synthesis and reporting flow",
        excellent: "Demonstrates complete mastery of the synthesis and reporting flow",
        veryGood: "Good understanding with minor conceptual gaps",
        good: "Moderate understanding of process flow",
        satisfactory: "Needs guidance to complete synthesis steps",
      },
      {
        id: "r3-7",
        criteria: "Result Documentation and Clarity",
        explanation: "Presentation and organization of synthesis results",
        excellent: "Results clearly presented with organized screenshots and summary",
        veryGood: "Results documented with minor omissions",
        good: "Partial documentation with limited clarity",
        satisfactory: "Poorly documented or missing results",
      },
    ],
  },
  {
    round: 4,
    title: "Final Presentation",
    totalMarks: "28M",
    excellentLabel: "Excellent (4)",
    criteria: [
      {
        id: "r4-1",
        criteria: "Functional Correctness",
        explanation: "Accuracy of the final design output and verification status",
        excellent: "Design fully functional with zero mismatches",
        veryGood: "Minor functional mismatches",
        good: "Design works partially with known issues",
        satisfactory: "Functional errors persist",
      },
      {
        id: "r4-2",
        criteria: "Constraint Achievement",
        explanation: "Ability to meet design constraints effectively (Timing, Area, Power)",
        excellent: "All constraints met with balanced optimization",
        veryGood: "Most constraints achieved with minor violations",
        good: "Some constraints unmet",
        satisfactory: "Major constraint violations",
      },
      {
        id: "r4-3",
        criteria: "Frequency and Performance Metrics",
        explanation: "Operating frequency and design throughput",
        excellent: "Design achieves target frequency with margin",
        veryGood: "Frequency slightly below target",
        good: "Meets minimum acceptable frequency",
        satisfactory: "Fails to meet performance targets",
      },
      {
        id: "r4-4",
        criteria: "Innovation and Modularity",
        explanation: "Novelty and modularity in design architecture",
        excellent: "Highly modular, innovative approach improving reusability",
        veryGood: "Some modularity with innovative aspects",
        good: "Limited innovation or partial modularity",
        satisfactory: "Conventional design; lacks innovation",
      },
      {
        id: "r4-5",
        criteria: "Coding Compatibility and Quality",
        explanation: "Code readability, reusability, and standard compliance",
        excellent: "Clean, well-documented, and reusable HDL code",
        veryGood: "Follows standards with few inconsistencies",
        good: "Acceptable code quality; limited reusability",
        satisfactory: "Poor coding style; non-standard practices",
      },
      {
        id: "r4-6",
        criteria: "EDA Flow Integration and Refinement",
        explanation: "Integration of improvements into synthesis and verification flow",
        excellent: "Flow fully automated and refined across tools",
        veryGood: "Good integration with minor tool inconsistencies",
        good: "Basic integration achieved",
        satisfactory: "Manual or fragmented flow",
      },
      {
        id: "r4-7",
        criteria: "Presentation and Communication",
        explanation: "Clarity, confidence, and visualization of improvements",
        excellent: "Excellent presentation with clear visuals and technical depth",
        veryGood: "Clear and structured with minor gaps",
        good: "Understandable but lacks flow or impact",
        satisfactory: "Unclear or unorganized presentation",
      },
    ],
  },
];

const roundColors = [
  { bg: "bg-round1/10", border: "border-round1/40", text: "text-round1", pill: "bg-round1" },
  { bg: "bg-round2/10", border: "border-round2/40", text: "text-round2", pill: "bg-round2" },
  { bg: "bg-round3/10", border: "border-round3/40", text: "text-round3", pill: "bg-round3" },
  { bg: "bg-round4/10", border: "border-round4/40", text: "text-round4", pill: "bg-round4" },
];

const Rubrics = () => {
  const [activeRound, setActiveRound] = useState(0);
  const currentRubric = rubrics[activeRound];
  const colors = roundColors[activeRound];

  return (
    <section id="rubrics" className="py-12 sm:py-20 bg-paper">
      <div className="container px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-8 sm:mb-12 max-w-2xl text-center">
          <h2
            className="font-rye text-3xl sm:text-4xl md:text-5xl text-foreground uppercase tracking-wide mb-2"
            style={{ textShadow: "2px 2px 0px hsl(var(--card))" }}
          >
            Evaluation Rubrics
          </h2>
          <p className="font-serif text-base sm:text-lg text-muted-foreground">
            Detailed scoring criteria for each round
          </p>
        </div>

        {/* Round Tabs */}
        <div className="mx-auto max-w-5xl mb-6 sm:mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {rubrics.map((rubric, index) => (
              <button
                key={rubric.round}
                onClick={() => setActiveRound(index)}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 font-sans font-bold text-xs sm:text-sm tracking-wider uppercase transition-all border-2 ${
                  activeRound === index
                    ? "bg-foreground text-background border-foreground shadow-[3px_3px_0_hsl(var(--border))]"
                    : "bg-transparent text-foreground/70 border-foreground/30 hover:border-foreground/60 hover:text-foreground"
                }`}
              >
                <span className="hidden sm:inline">Round {rubric.round}: </span>
                <span className="sm:hidden">R{rubric.round}: </span>
                {rubric.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Rubric Table */}
        <div className="mx-auto max-w-5xl">
          {/* Round title bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 sm:mb-6 px-1">
            <h3 className="font-rye text-lg sm:text-2xl text-foreground">
              Round {currentRubric.round} — {currentRubric.title}
            </h3>
            <span className="inline-block bg-foreground/85 text-background px-3 py-1 font-sans font-bold text-xs sm:text-sm tracking-widest uppercase">
              Total: {currentRubric.totalMarks}
            </span>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto border-2 border-foreground/30">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-foreground/85 text-background">
                  <th className="px-3 py-3 font-sans font-bold text-xs tracking-widest uppercase w-8">S.No.</th>
                  <th className="px-3 py-3 font-sans font-bold text-xs tracking-widest uppercase">Criteria</th>
                  <th className="px-3 py-3 font-sans font-bold text-xs tracking-widest uppercase">Explanation</th>
                  <th className="px-3 py-3 font-sans font-bold text-xs tracking-widest uppercase text-center bg-green-900/30">{currentRubric.excellentLabel}</th>
                  <th className="px-3 py-3 font-sans font-bold text-xs tracking-widest uppercase text-center bg-blue-900/30">Very Good (3)</th>
                  <th className="px-3 py-3 font-sans font-bold text-xs tracking-widest uppercase text-center bg-yellow-900/30">Good (2)</th>
                  <th className="px-3 py-3 font-sans font-bold text-xs tracking-widest uppercase text-center bg-red-900/30">Satisfactory (1)</th>
                </tr>
              </thead>
              <tbody>
                {currentRubric.criteria.map((c, i) => (
                  <tr key={c.id} className={`border-t border-foreground/20 ${i % 2 === 0 ? "bg-card/30" : "bg-card/60"} hover:bg-card/80 transition-colors`}>
                    <td className="px-3 py-3 font-rye text-sm text-foreground/70 text-center">R{i + 1}</td>
                    <td className="px-3 py-3 font-sans font-bold text-sm text-foreground">{c.criteria}</td>
                    <td className="px-3 py-3 font-serif text-sm text-foreground/70">{c.explanation}</td>
                    <td className="px-3 py-3 font-serif text-xs text-foreground/80 bg-green-900/5">{c.excellent}</td>
                    <td className="px-3 py-3 font-serif text-xs text-foreground/80 bg-blue-900/5">{c.veryGood}</td>
                    <td className="px-3 py-3 font-serif text-xs text-foreground/80 bg-yellow-900/5">{c.good}</td>
                    <td className="px-3 py-3 font-serif text-xs text-foreground/80 bg-red-900/5">{c.satisfactory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {currentRubric.criteria.map((c, i) => (
              <div key={c.id} className="border-2 border-foreground/25 bg-card/40 p-4 relative">
                <div className="absolute -top-2.5 -right-2 bg-foreground/85 text-background px-2 py-0.5 font-rye text-xs">
                  R{i + 1}
                </div>
                <h4 className="font-sans font-bold text-sm text-foreground mb-1">{c.criteria}</h4>
                <p className="font-serif text-xs text-muted-foreground mb-3 italic">{c.explanation}</p>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="shrink-0 w-20 font-sans font-bold text-[10px] tracking-wider uppercase text-green-800 bg-green-900/10 px-1.5 py-1 text-center border border-green-900/20">Excellent</span>
                    <p className="font-serif text-xs text-foreground/80">{c.excellent}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="shrink-0 w-20 font-sans font-bold text-[10px] tracking-wider uppercase text-blue-800 bg-blue-900/10 px-1.5 py-1 text-center border border-blue-900/20">Very Good</span>
                    <p className="font-serif text-xs text-foreground/80">{c.veryGood}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="shrink-0 w-20 font-sans font-bold text-[10px] tracking-wider uppercase text-yellow-800 bg-yellow-900/10 px-1.5 py-1 text-center border border-yellow-900/20">Good</span>
                    <p className="font-serif text-xs text-foreground/80">{c.good}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="shrink-0 w-20 font-sans font-bold text-[10px] tracking-wider uppercase text-red-800 bg-red-900/10 px-1.5 py-1 text-center border border-red-900/20">Satisfactory</span>
                    <p className="font-serif text-xs text-foreground/80">{c.satisfactory}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rubrics;
