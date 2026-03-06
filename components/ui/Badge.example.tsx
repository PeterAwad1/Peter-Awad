/**
 * Badge Component Usage Examples
 * 
 * This file demonstrates various ways to use the Badge component.
 * Import and use these examples in your sections as needed.
 */

import { Badge } from "./Badge";
import { Code, Zap, CheckCircle } from "lucide-react";

export function BadgeExamples() {
  return (
    <div className="space-y-8 p-8">
      {/* Size Variants */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex gap-2 items-center">
          <Badge text="Small" size="sm" />
          <Badge text="Medium" size="md" />
          <Badge text="Large" size="lg" />
        </div>
      </div>

      {/* Color Variants */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Variants</h3>
        <div className="flex gap-2 items-center">
          <Badge text="Default" variant="default" />
          <Badge text="Primary" variant="primary" />
          <Badge text="Secondary" variant="secondary" />
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">With Icons</h3>
        <div className="flex gap-2 items-center">
          <Badge text="React" icon={<Code />} variant="primary" />
          <Badge text="Fast" icon={<Zap />} variant="secondary" />
          <Badge text="Production" icon={<CheckCircle />} variant="default" />
        </div>
      </div>

      {/* Technology Badges with Pulse */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Technology Badges (with pulse animation)</h3>
        <div className="flex flex-wrap gap-2">
          <Badge text="React" variant="primary" pulse />
          <Badge text="Next.js" variant="primary" pulse />
          <Badge text="TypeScript" variant="primary" pulse />
          <Badge text="Tailwind CSS" variant="secondary" pulse />
          <Badge text="Framer Motion" variant="secondary" pulse />
        </div>
      </div>

      {/* Status Labels */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Status Labels</h3>
        <div className="flex gap-2 items-center">
          <Badge text="Production" variant="primary" size="sm" />
          <Badge text="Development" variant="secondary" size="sm" />
          <Badge text="Completed" variant="default" size="sm" />
        </div>
      </div>

      {/* Combined: Icons + Sizes + Variants */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Combined Features</h3>
        <div className="flex flex-wrap gap-2">
          <Badge text="React" icon={<Code />} variant="primary" size="sm" pulse />
          <Badge text="Next.js" icon={<Code />} variant="primary" size="md" pulse />
          <Badge text="TypeScript" icon={<Code />} variant="secondary" size="lg" pulse />
        </div>
      </div>
    </div>
  );
}
