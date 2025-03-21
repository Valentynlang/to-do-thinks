import { FooterProps } from '../../types/components';

const Footer: React.FC<FooterProps> = ({ 
  year = new Date().getFullYear(), 
  appName = 'To-Do Thinks' 
}) => {
  return (
    <footer className="mt-8 text-center text-sm text-gray-500">
      <p>© {year} {appName} | Умный список задач</p>
    </footer>
  );
};

export default Footer; 