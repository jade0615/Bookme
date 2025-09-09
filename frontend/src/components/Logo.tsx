interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export function Logo({ size = 'md', variant = 'dark' }: LogoProps) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl', 
    lg: 'text-4xl'
  };

  const colors = {
    dark: 'text-gray-900',
    light: 'text-white'
  };

  return (
    <div className="flex items-center">
      <span className={`font-bold ${sizes[size]} ${colors[variant]} tracking-tight`}>
        Book<span className="text-blue-600">Me</span>
      </span>
    </div>
  );
}