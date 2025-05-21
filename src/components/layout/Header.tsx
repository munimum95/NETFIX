interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold text-main">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </header>
  );
};

export default Header;
