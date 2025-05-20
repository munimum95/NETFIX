const Box = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm">{children}</div>;
};

export default Box;
