"use client";

export function DotBackground({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}): JSX.Element {
  return (
    <div
      className="lg:h-fit h-full w-full first-line:bg-black bg-dot-white/[0.2] relative flex items-center justify-center"
      id={id}
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      {children}
    </div>
  );
}
