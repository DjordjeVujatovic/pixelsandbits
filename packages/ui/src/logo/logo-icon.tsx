interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  id?: string;
}

export function LogoIcon({
  width = 266.5,
  height = 64.33,
  id = "logo-icon",
}: LogoProps): JSX.Element {
  return (
    <svg height={height} viewBox="0 0 406 98" width={width}>
      <defs>
        <linearGradient id={id} x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" /> {/* indigo-500 */}
          <stop offset="100%" stopColor="#a855f7" /> {/* purple-500 */}
        </linearGradient>
      </defs>
      <g
        data-feature-key="symbolFeature-0"
        fill={`url(#${id})`}
        transform="matrix(1.119402985074627,0,0,1.119402985074627,-16.791044776119406,-7.19402985074627)"
      >
        <path
          d="M50,10L15,30v40l35,20l34.99-19.994L85,69.99V30L50,10z M50,17.699L74.89,31.92l-6.732,3.848L50,25.397L31.846,35.771  l-6.738-3.851L50,17.699z M64.795,41.546v13.059L53.369,48.08V35.02L64.795,41.546z M46.631,35.02v13.057l-11.423,6.527V41.546  L46.631,35.02z M46.631,80.377L21.735,66.152v-28.46l6.734,3.848v20.761L46.631,72.68V80.377z M38.571,60.377l11.426-6.529  l11.429,6.529L50,66.904L38.571,60.377z M78.265,66.152L53.369,80.377V72.68L71.53,62.305V41.54l6.734-3.848V66.152z"
          xmlns="http://www.w3.org/2000/svg"
        />
      </g>
    </svg>
  );
}
