export const CircleChat = ({ message }) => {
  return (
    <div className="w-96 h-48 bg-slate-200 rounded-md bluePrint text-xl">
      {message ? message : 'Circle Chat'}
    </div>
  );
};
