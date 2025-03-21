import { HeaderProps } from '../../types';

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">{title}</h1>
      {subtitle && <p className="text-indigo-500">{subtitle}</p>}
    </header>
  );
};

export default Header; 