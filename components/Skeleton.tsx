const Skeleton: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  width?: string;
}> = ({ isLoading, children, width }) => {
  return isLoading ? (
    <span
      className={`block m-auto h-4${
        width ? ` ${width}` : ""
      } rounded-full bg-slate-300 animate-pulse`}
    />
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};

export default Skeleton;
