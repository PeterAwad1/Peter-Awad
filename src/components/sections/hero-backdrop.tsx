/**
 * Decorative hero atmosphere — grid, soft orbs, and a slow beam.
 * Pure CSS; hidden from assistive tech.
 */
export function HeroBackdrop() {
  return (
    <div
      className="hero-backdrop pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Perspective grid */}
      <div className="hero-grid absolute inset-0 opacity-[0.45]" />

      {/* Soft ambient orbs */}
      <div className="hero-orb hero-orb-a absolute -top-24 -start-16 h-[28rem] w-[28rem] rounded-full" />
      <div className="hero-orb hero-orb-b absolute top-1/3 -end-20 h-[22rem] w-[22rem] rounded-full" />
      <div className="hero-orb hero-orb-c absolute -bottom-32 start-1/3 h-[18rem] w-[18rem] rounded-full" />

      {/* Slow diagonal light sweep */}
      <div className="hero-beam absolute inset-0" />

      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
